/* Chapter 2 one-line diagram motion: power flows out from the substation, and SCADA telemetry
   and commands travel quietly along the existing monitoring and control lines.
   Same rules as the landing sheet: only brightness, opacity and motion change, never hue;
   one rAF loop, paused off-screen; does nothing under prefers-reduced-motion. */
(function(){
  'use strict';
  var svg=document.getElementById('diagramSvg');
  if(!svg||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){return;}

  var NS='http://www.w3.org/2000/svg';
  function mk(n,a,p){var e=document.createElementNS(NS,n);for(var k in a){e.setAttribute(k,a[k]);}if(p){p.appendChild(e);}return e;}
  function clamp(x,a,b){return Math.min(b,Math.max(a,x));}
  function put(el,prop,val){if(el._v===undefined){el._v={};}if(el._v[prop]!==val){el._v[prop]=val;el.style[prop]=val;}}

  var css=document.createElement('style');
  css.textContent=
    '.fx-dim{opacity:.55}'+
    '.fx{pointer-events:none}'+
    '.fx-lit{fill:none;stroke-width:1.8;opacity:.5;display:none}'+
    '.fx-pk.tel{opacity:.6}'+
    '.fx-pk.cmd{fill:var(--sheet);stroke-width:1.3;opacity:.6}'+
    '.fx-halo{fill:none;stroke-width:2.5;opacity:0}'+
    '.fx-flow{fill:none;stroke-width:1.5;stroke-linecap:butt}';
  document.head.appendChild(css);

  var TEL='var(--data-tel)',CTL='var(--data-ctl)';
  var vt=0,sched=[],packets=[],visible=false,raf=0,last=0,ready=false;
  var glow={},halos={},borders=[],flows=[],paths={};
  var PULSE_MAX=0.7,FLOW_CYCLE=3.6;
  var layer,gFlow,gLits,gHalos,gPk;

  /* telemetry runs field to control center; the control path runs the other way */
  var routes={
    recloser:{d:'M230 184 V118 H860 V82',c:TEL},
    'switch':{d:'M620 184 V118 H860 V82',c:TEL},
    ctl:{d:'M868 82 V128 H628 V182',c:CTL}
  };

  /* power paths, cut around the equipment boxes so the highlight never covers a symbol */
  var power=[
    ['M170 196 H216','--v-primary'],['M244 196 H607','--v-primary'],['M633 196 H915','--v-primary'],
    ['M360 196 V262','--v-primary'],['M360 278 V318','--v-primary'],['M740 248 V296','--v-primary'],
    ['M360 358 V418','--v-secondary'],['M740 392 V438','--v-secondary']
  ];

  function node(id){return svg.querySelector('.node[data-id="'+id+'"] rect');}
  function halo(id,el,color){
    var b=el.getBBox(),pad=3;
    var h=mk('rect',{x:b.x-pad,y:b.y-pad,width:b.width+2*pad,height:b.height+2*pad,rx:2,'class':'fx-halo',stroke:color,style:'filter:drop-shadow(0 0 4px '+color+')'},gHalos);
    halos[id]=h;glow[id]=0;
  }

  function init(){
    layer=mk('g',{'class':'fx','aria-hidden':'true'},svg);
    gFlow=mk('g',{},layer);gLits=mk('g',{},layer);gHalos=mk('g',{},layer);gPk=mk('g',{},layer);

    ['scada','substation','recloser','switch'].forEach(function(id){
      var r=node(id);
      if(r){borders.push(r);if(id!=='substation'){halo(id,r,TEL);}}
    });
    halos.scada&&halos.scada.setAttribute('stroke',TEL);

    [].forEach.call(svg.querySelectorAll('path[stroke="var(--data-tel)"], path[stroke="var(--data-ctl)"]'),function(p){p.classList.add('fx-dim');});

    Object.keys(routes).forEach(function(k){
      var r=routes[k],g=mk('path',{d:r.d,fill:'none',stroke:'none'},gLits);
      paths[k]={el:g,len:g.getTotalLength(),color:r.c,lit:mk('path',{d:r.d,'class':'fx-lit',stroke:r.c},gLits)};
    });

    power.forEach(function(p){
      var el=mk('path',{d:p[0],'class':'fx-flow',style:'stroke:color-mix(in srgb, var('+p[1]+') 30%, var(--sheet))'},gFlow);
      var len=el.getTotalLength(),dash=clamp(len*0.3,14,48);
      el.style.strokeDasharray=dash+' '+(len+dash);
      flows.push({el:el,len:len,dash:dash});
    });
    ready=true;
    after(0.3,loopFast);after(2,loopOps);
  }

  function after(d,fn){sched.push({t:vt+d,fn:fn});}
  function runSched(){
    var due=[],rest=[];
    sched.forEach(function(s){(s.t<=vt?due:rest).push(s);});
    sched=rest;
    due.sort(function(a,b){return a.t-b.t;}).forEach(function(s){s.fn();});
  }
  function pulse(id){if(halos[id]){glow[id]=1;}}
  function send(k,dir,dur,kind,done){
    var P=paths[k];
    var attrs={r:kind==='cmd'?3:2.4,'class':'fx-pk '+(kind==='cmd'?'cmd':'tel')};
    if(kind==='cmd'){attrs.stroke=P.color;}else{attrs.fill=P.color;}
    packets.push({k:k,dir:dir,dur:dur,start:vt,el:mk('circle',attrs,gPk),done:done||function(){}});
  }
  function updatePackets(){
    var active={},keep=[],finished=[];
    packets.forEach(function(pk){
      var u=(vt-pk.start)/pk.dur,P=paths[pk.k];
      if(u>=1){pk.el.remove();finished.push(pk);return;}
      var head=(pk.dir>0?u:1-u)*P.len,pt=P.el.getPointAtLength(head);
      pk.el.setAttribute('cx',pt.x.toFixed(1));pk.el.setAttribute('cy',pt.y.toFixed(1));
      var trail=Math.min(40,P.len*0.3),s=pk.dir>0?head-trail:head;
      P.lit.style.strokeDasharray=trail+' '+(P.len*3);
      P.lit.style.strokeDashoffset=String(-s);
      P.lit.style.display='block';
      active[pk.k]=true;keep.push(pk);
    });
    packets=keep;
    for(var k in paths){if(!active[k]){paths[k].lit.style.display='none';}}
    finished.forEach(function(pk){pk.done();});
  }

  /* field devices report in, one after the other */
  function loopFast(){
    function run(k){pulse(k);send(k,1,1.6,'tel',function(){pulse('scada');});}
    run('recloser');
    after(1.4,function(){run('switch');});
    after(4.4,loopFast);
  }
  /* now and then the control center sends a command down to the switch */
  function loopOps(){
    pulse('scada');
    send('ctl',1,1.4,'cmd',function(){pulse('switch');});
    after(11,loopOps);
  }

  function render(){
    var id;
    for(id in glow){put(halos[id],'opacity',(glow[id]*PULSE_MAX).toFixed(3));}
    borders.forEach(function(b,i){
      put(b,'strokeOpacity',(0.7+0.3*(0.5+0.5*Math.sin(vt*1.2+i*1.3))).toFixed(3));
    });
    var ph=(vt/FLOW_CYCLE)%1;
    flows.forEach(function(f){put(f.el,'strokeDashoffset',(f.dash-ph*(f.len+f.dash)).toFixed(1));});
  }

  function frame(now){
    raf=0;
    if(!visible){return;}
    var dt=Math.min(0.05,(now-last)/1000);last=now;
    vt+=dt;
    runSched();updatePackets();
    for(var id in glow){glow[id]=Math.max(0,glow[id]-dt*2.2);}
    render();
    raf=requestAnimationFrame(frame);
  }
  function start(){if(!ready){init();}if(!raf){last=performance.now();raf=requestAnimationFrame(frame);}}

  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      visible=es[es.length-1].isIntersecting;
      if(visible){start();}
    },{threshold:0.05}).observe(svg);
  }else{
    visible=true;start();
  }
})();
