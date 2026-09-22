(function(){
"use strict";
const c=document.getElementById("starfield");if(!c)return;const x=c.getContext("2d",{alpha:true});if(!x)return;
let w=0,h=0,d=1,last=0,sy=0;const s=[],b=[];const p={x:-1e4,y:-1e4,on:false};
function size(){d=Math.min(devicePixelRatio||1,1.25);w=innerWidth;h=innerHeight;c.width=Math.floor(w*d);c.height=Math.floor(h*d);x.setTransform(d,0,0,d,0,0);s.length=0;const n=w<700?360:700,world=Math.max(h,document.documentElement.scrollHeight||h);for(let i=0;i<n;i++)s.push({x:Math.random()*w,y:Math.random()*world,r:.35+Math.random()*.82,a:.22+Math.random()*.55,t:Math.random()*6.28,v:.15+Math.random()*.6})}
addEventListener("mousemove",e=>{p.x=e.clientX;p.y=e.clientY;p.on=true},{passive:true});addEventListener("mouseleave",()=>p.on=false,{passive:true});
addEventListener("click",e=>b.push({x:e.clientX,y:e.clientY,l:1}),{passive:true});addEventListener("touchstart",e=>{const q=e.touches&&e.touches[0];if(q){p.x=q.clientX;p.y=q.clientY;p.on=true;b.push({x:q.clientX,y:q.clientY,l:1})}},{passive:true});addEventListener("touchend",()=>p.on=false,{passive:true});
addEventListener("resize",size,{passive:true});addEventListener("scroll",()=>sy=window.scrollY||0,{passive:true});
function frame(t){const dt=Math.min(40,Math.max(1,t-last||16));last=t;x.clearRect(0,0,w,h);
for(const z of s){z.x-=dt*.003*z.v*1.6;if(z.x<-3)z.x=w+3;let X=z.x,Y=z.y-sy*.055;if(p.on){const dx=X-p.x,dy=Y-p.y,dist=Math.hypot(dx,dy)||1,rad=125;if(dist<rad){const f=(1-dist/rad)*10;X+=dx/dist*f;Y+=dy/dist*f}}if(Y<-4||Y>h+4)continue;x.globalAlpha=z.a*(.86+.14*Math.sin(t*.001+z.t));x.fillStyle="#fff";x.beginPath();x.arc(X,Y,z.r,0,Math.PI*2);x.fill()}
for(let i=b.length-1;i>=0;i--){const q=b[i];q.l-=dt*.0024;if(q.l<=0){b.splice(i,1);continue}x.globalAlpha=q.l*.18;x.strokeStyle="#fff";x.lineWidth=1;x.beginPath();x.arc(q.x,q.y,(1-q.l)*66,0,Math.PI*2);x.stroke()}x.globalAlpha=1;requestAnimationFrame(frame)}
size();requestAnimationFrame(frame);
})();