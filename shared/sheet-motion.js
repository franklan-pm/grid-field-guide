/* Landing page sheet motion: chapter 4 telemetry and chapter 5 battery rack.
   Chapters 1 to 3 are animated in CSS (.flow in index.html) and are not touched here.
   Rules: only brightness, opacity, motion and fill level change, never hue. One rAF loop,
   paused off-screen. With prefers-reduced-motion this file does nothing, so the sheet stays static. */
(function(){
  'use strict';
  var svg=document.getElementById('sheet');
  if(!svg||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){return;}

  var NS='http://www.w3.org/2000/svg';
  function mk(n,a,p){var e=document.createElementNS(NS,n);for(var k in a){e.setAttribute(k,a[k]);}if(p){p.appendChild(e);}return e;}
  function q(sel){return svg.querySelector(sel);}
  function clamp(x,a,b){return Math.min(b,Math.max(a,x));}
  /* write a style value only when it changed */
  function put(el,prop,val){if(el._v===undefined){el._v={};}if(el._v[prop]!==val){el._v[prop]=val;el.style[prop]=val;}}

  /* ---------- styles (tokens only) ---------- */
  var css=document.createElement('style');
  css.textContent=
    '.fx-dim{opacity:.5}'+
    '.fx{pointer-events:none}'+
    '.fx-lit{fill:none;stroke:var(--data);stroke-width:1.6;opacity:.45;display:none}'+
    '.fx-pk.tel{fill:var(--data);opacity:.55}'+
    '.fx-pk.cmd{fill:var(--sheet);stroke:var(--data);stroke-width:1.2;opacity:.55}'+
    '.fx-halo{fill:none;stroke:var(--data);stroke-width:2.5;opacity:0;filter:drop-shadow(0 0 4px var(--data))}'+
    '.fx-halo.g{stroke:var(--fuel-battery);filter:drop-shadow(0 0 4px var(--fuel-battery))}'+
    '.fx-flow{fill:none;stroke-width:1.4;stroke-linecap:butt;stroke-dasharray:14 100}'+
    '.fx-ah{transition:opacity .3s}';
  document.head.appendChild(css);

  /* ---------- state ---------- */
  var charging=true;                         /* the whole rack shares one direction */
  var modSoc=[0.30,0.45,0.22,0.38];          /* each module has its own level */
  var modRate=[0.035,0.045,0.03,0.04];       /* and its own pace per second */
  var vt=0,sched=[],packets=[],flowPhase=0,visible=false,raf=0,last=0;
  var PULSE_MAX=0.7;
  var glow={},halos={},modGlow=[0,0,0,0],modHalos=[];

  /* ---------- overlay layer, above the artwork, never catches clicks ---------- */
  var layer=mk('g',{'class':'fx','aria-hidden':'true'},svg);
  var gFlow=mk('g',{},layer),gLits=mk('g',{},layer),gHalos=mk('g',{},layer),gPk=mk('g',{},layer);

  /* ---------- halos built from the real box geometry ---------- */
  function halo(id,el,green){
    var b=el.getBBox(),pad=3;
    var round=el.tagName.toLowerCase()==='circle';
    var h=mk('rect',{x:b.x-pad,y:b.y-pad,width:b.width+2*pad,height:b.height+2*pad,rx:round?(b.width+2*pad)/2:2,'class':'fx-halo'+(green?' g':'')},gHalos);
    if(id){halos[id]=h;glow[id]=0;}
    return h;
  }
  ['scada','adms','derms','recloser','switch','pcc','bess','bms','pcs'].forEach(function(id){halo(id,q('[data-node="'+id+'"]'));});
  [].forEach.call(q('#modules').querySelectorAll('rect'),function(r){modHalos.push(halo(null,r,true));});

  /* ---------- faint breathing on the chapter 4 and 5 box borders ---------- */
  var boxes=['scada','adms','derms','bms','pcs','rack'].map(function(id){return q('[data-node="'+id+'"]');});

  /* ---------- idle data lines recede so packets read as light passing through ---------- */
  [].forEach.call(svg.querySelectorAll('.zone[data-ch="4"] .data, .zone[data-ch="5"] .data, #data-field'),function(el){el.classList.add('fx-dim');});

  /* ---------- telemetry guide paths, all drawn field to control room ---------- */
  var routes={
    recloser:'M539 392 V132',
    'switch':'M638 392 V165 H606 V132',
    sa:'M622 107 H671',
    ad:'M870 107 H943',
    pcc:'M1078 386 V132',
    bms:'M1398 325 H1433 V531',
    bmspcs:'M1348 350 V494'
  };
  var paths={};
  Object.keys(routes).forEach(function(k){
    var g=mk('path',{d:routes[k],fill:'none',stroke:'none'},gLits);
    paths[k]={el:g,len:g.getTotalLength(),lit:mk('path',{d:routes[k],'class':'fx-lit'},gLits)};
  });

  /* ---------- chapter 5: one cell element each, so a cell can dim on its own ---------- */
  var cellsByMod=[];
  [].forEach.call(q('#cells').querySelectorAll('path'),function(p,m){
    var b=p.getBBox(),row=[];
    for(var c=0;c<5;c++){row.push(mk('rect',{x:b.x+14*c,y:b.y,width:9,height:b.height},p.parentNode));}
    p.parentNode.removeChild(p);
    cellsByMod[m]=row;
  });

  /* ---------- power flow: the same travelling highlight as chapters 1 to 3, but reversible ---------- */
  var flows=[
    {d:'M1078 418 V458 H1178 V498',c:'var(--v-secondary)'},
    {d:'M1242 519.5 H1298',c:'var(--v-secondary)'},
    {d:'M1398 519.5 H1428',c:'var(--v-secondary)'}
  ].map(function(f){
    return mk('path',{d:f.d,pathLength:100,'class':'fx-flow',style:'stroke:color-mix(in srgb, '+f.c+' 30%, var(--sheet))'},gFlow);
  });

  /* ---------- TWO-WAY arrow: one head per direction so each can fade on its own ---------- */
  var arrow=q('#two-way');
  var ahL=mk('path',{d:'M980 385 H1030',stroke:'var(--v-primary)','stroke-width':1.6,'marker-start':'url(#arr)','class':'fx-ah'},arrow.parentNode);
  var ahR=mk('path',{d:'M980 385 H1030',stroke:'var(--v-primary)','stroke-width':1.6,'marker-end':'url(#arr)','class':'fx-ah'},arrow.parentNode);
  arrow.style.display='none';

  /* ---------- scheduler and packets ---------- */
  function after(d,fn){sched.push({t:vt+d,fn:fn});}
  function runSched(){
    var due=[],rest=[];
    sched.forEach(function(s){(s.t<=vt?due:rest).push(s);});
    sched=rest;
    due.sort(function(a,b){return a.t-b.t;}).forEach(function(s){s.fn();});
  }
  function pulse(id){if(halos[id]){glow[id]=1;}}
  function send(k,dir,dur,kind,done,onMove){
    var e=mk('circle',{r:kind==='cmd'?2.8:2.2,'class':'fx-pk '+(kind==='cmd'?'cmd':'tel')},gPk);
    packets.push({k:k,dir:dir,dur:dur,start:vt,el:e,done:done||function(){},onMove:onMove});
  }
  function updatePackets(){
    var active={},keep=[],finished=[];
    packets.forEach(function(pk){
      var u=(vt-pk.start)/pk.dur,P=paths[pk.k];
      if(u>=1){pk.el.remove();finished.push(pk);return;}
      var head=(pk.dir>0?u:1-u)*P.len;
      var pt=P.el.getPointAtLength(head);
      pk.el.setAttribute('cx',pt.x.toFixed(1));pk.el.setAttribute('cy',pt.y.toFixed(1));
      var trail=Math.min(36,P.len*0.4);
      var s=pk.dir>0?head-trail:head;
      P.lit.style.strokeDasharray=trail+' '+(P.len*3);
      P.lit.style.strokeDashoffset=String(-s);
      P.lit.style.display='block';
      active[pk.k]=true;
      if(pk.onMove){pk.onMove(pt);}
      keep.push(pk);
    });
    packets=keep;
    for(var k in paths){if(!active[k]){paths[k].lit.style.display='none';}}
    finished.forEach(function(pk){pk.done();});
  }

  /* ---------- what the packets do ---------- */
  function loopFast(){
    function run(k,id){pulse(id);send(k,1,0.9,'tel',function(){pulse('scada');});}
    run('recloser','recloser');
    after(1.1,function(){run('switch','switch');});
    after(2.2,loopFast);
  }
  function loopOps(){
    pulse('scada');
    send('sa',1,0.9,'tel',function(){
      pulse('adms');
      after(0.5,function(){
        send('sa',-1,0.9,'cmd',function(){
          pulse('scada');
          send('switch',-1,0.9,'cmd',function(){pulse('switch');});
        });
      });
    });
    after(7,loopOps);
  }
  function loopDers(){
    pulse('pcc');
    send('pcc',1,3,'tel',function(){
      pulse('derms');
      send('ad',-1,0.9,'tel',function(){
        pulse('adms');
        after(0.4,function(){
          send('ad',1,0.9,'cmd',function(){
            pulse('derms');
            send('pcc',-1,3,'cmd',function(){
              pulse('pcc');
              after(0.3,function(){
                pulse('bess');pulse('pcs');
                charging=!charging;
              });
            });
          });
        });
      });
    });
    after(16,loopDers);
  }
  function loopHb(){
    pulse('bms');
    var seen=[0,0,0,0];
    send('bms',1,1.8,'tel',function(){
      send('bmspcs',1,0.8,'tel',function(){pulse('pcs');});
    },function(pt){
      if(pt.x<1430){return;}
      for(var m=0;m<4;m++){
        if(!seen[m]&&pt.y>=345+m*56){seen[m]=1;modGlow[m]=1;}
      }
    });
    after(4.5,loopHb);
  }

  /* ---------- drawing ---------- */
  function render(){
    var id,m,c;
    for(id in glow){put(halos[id],'opacity',(glow[id]*PULSE_MAX).toFixed(3));}
    for(m=0;m<4;m++){put(modHalos[m],'opacity',(modGlow[m]*PULSE_MAX).toFixed(3));}
    boxes.forEach(function(b,i){
      put(b,'strokeOpacity',(0.65+0.35*(0.5+0.5*Math.sin(vt*1.2+i*1.3))).toFixed(3));
    });
    for(m=0;m<4;m++){
      var lvl=modSoc[m]*5,wave=((vt*0.8+m*0.22)%1.6)-0.3;
      for(c=0;c<5;c++){
        var a=clamp(lvl-c,0,1),x=charging?c/4:1-c/4;
        var boost=Math.exp(-Math.pow(x-wave,2)/0.035)*0.35;
        put(cellsByMod[m][c],'opacity',(0.1+0.6*a+boost*a).toFixed(2));
      }
    }
    put(ahR,'opacity',charging?'1':'0.25');
    put(ahL,'opacity',charging?'0.25':'1');
    var off=(14-114*flowPhase).toFixed(1);
    flows.forEach(function(f){put(f,'strokeDashoffset',off);});
  }

  function frame(now){
    raf=0;
    if(!visible){return;}
    var dt=Math.min(0.05,(now-last)/1000);last=now;
    vt+=dt;
    runSched();
    updatePackets();
    var dir=charging?1:-1,m,id;
    for(m=0;m<4;m++){modSoc[m]=clamp(modSoc[m]+dir*modRate[m]*dt,0.08,1);modGlow[m]=Math.max(0,modGlow[m]-dt*2.2);}
    for(id in glow){glow[id]=Math.max(0,glow[id]-dt*2.2);}
    flowPhase=((flowPhase+dir*dt/3)%1+1)%1;
    render();
    raf=requestAnimationFrame(frame);
  }
  function start(){if(!raf){last=performance.now();raf=requestAnimationFrame(frame);}}

  render();
  after(0.3,loopFast);after(1,loopDers);after(1.5,loopHb);after(3,loopOps);
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      visible=es[es.length-1].isIntersecting;
      if(visible){start();}
    },{threshold:0.05}).observe(svg);
  }else{
    visible=true;start();
  }
})();
