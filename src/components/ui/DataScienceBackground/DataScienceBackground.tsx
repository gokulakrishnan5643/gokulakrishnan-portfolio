import React, { useEffect, useRef } from 'react';
import styles from './DataScienceBackground.module.scss';

type Point = { x:number; y:number; r:number; vx:number; vy:number; value:number };
type Bar = { x:number; w:number; h:number; target:number };

export const DataScienceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const barsRef = useRef<Bar[]>([]);

  useEffect(()=>{
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let w = 0; let h = 0; let dpr = 1;

    function initPoints(){
      const count = Math.max(40, Math.floor(w/30));
      const pts:Point[] = [];
      for(let i=0;i<count;i++){
        const x = Math.random() * (w*0.7) + w*0.15;
        const y = Math.random() * (h*0.6) + h*0.12;
        const r = 2 + Math.random()*4;
        const vx = (Math.random()-0.5) * 10;
        const vy = (Math.random()-0.5) * 6;
        const value = Math.random();
        pts.push({ x,y,r,vx,vy,value });
      }
      pointsRef.current = pts;
    }

    function initBars(){
      const barCount = Math.max(6, Math.floor(w/140));
      const bars:Bar[] = [];
      const bw = Math.floor((w*0.6) / barCount);
      const startX = Math.floor(w*0.2);
      for(let i=0;i<barCount;i++){
        bars.push({ x: startX + i*(bw+8), w: bw, h: Math.random()*h*0.18, target: Math.random()*h*0.18 });
      }
      barsRef.current = bars;
    }

    function resize(){
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      initPoints();
      initBars();
    }

    let last = performance.now();
    function draw(now:number){
      const dt = Math.min(40, now - last) * 0.001;
      last = now;
      ctx.clearRect(0,0,w,h);

      // background gradient (deep navy -> indigo)
      const bg = ctx.createLinearGradient(0,0,w,h);
      bg.addColorStop(0,'#071329');
      bg.addColorStop(1,'#08162a');
      ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);

      // draw subtle grid for data-science feel
      ctx.save();
      ctx.strokeStyle = 'rgba(120,180,200,0.03)';
      ctx.lineWidth = 1;
      const gx = 40; const gy = 36;
      for(let x=gx;x<w;x+=gx){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
      for(let y=gy;y<h;y+=gy){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
      ctx.restore();

      // animate and draw scatter points (data points)
      const pts = pointsRef.current;
      // draw connections (k-nearest style)
      ctx.lineWidth = 1;
      for(let i=0;i<pts.length;i++){
        const a = pts[i];
        // move
        a.x += a.vx * dt * 30;
        a.y += a.vy * dt * 30;
        // bounds
        if(a.x < w*0.12 || a.x > w*0.88) a.vx *= -1.0;
        if(a.y < h*0.12 || a.y > h*0.88) a.vy *= -1.0;
      }

      // draw lines between close neighbors
      for(let i=0;i<pts.length;i++){
        const a = pts[i];
        for(let j=i+1;j<pts.length;j++){
          const b = pts[j];
          const dx = a.x - b.x; const dy = a.y - b.y;
          const d2 = dx*dx + dy*dy;
          if(d2 < 9000){
            const alpha = 0.18 * (1 - d2/9000);
            ctx.strokeStyle = `rgba(120,210,255,${alpha})`;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }

      // draw points
      for(const p of pts){
        const scale = 0.6 + p.value*1.6;
        const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,8);
        grad.addColorStop(0,'rgba(180,240,255,0.95)');
        grad.addColorStop(0.25,'rgba(90,200,255,0.45)');
        grad.addColorStop(1,'rgba(10,10,20,0)');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(p.x,p.y, p.r*scale,0,Math.PI*2); ctx.fill();
      }

      // draw animated regression-like curve (smooth path through average)
      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(140,220,255,0.16)';
      ctx.beginPath();
      const sorted = pts.slice().sort((a,b)=>a.x-b.x);
      for(let i=0;i<sorted.length;i++){
        const s = sorted[i];
        if(i===0) ctx.moveTo(s.x,s.y); else ctx.lineTo(s.x,s.y + Math.sin((now*0.002)+i*0.2)*6);
      }
      ctx.stroke();
      ctx.restore();

      // draw bottom bar chart (animated)
      const bars = barsRef.current;
      for(const b of bars){
        // smooth toward target
        b.h += (b.target - b.h) * 0.03;
        if(Math.random() < 0.004) b.target = Math.random()*h*0.18;
        const bx = b.x; const by = h*0.86;
        const barGrad = ctx.createLinearGradient(bx,by-b.h,bx,by);
        barGrad.addColorStop(0,'rgba(120,220,255,0.9)');
        barGrad.addColorStop(1,'rgba(70,90,160,0.18)');
        ctx.fillStyle = barGrad; ctx.fillRect(bx, by - b.h, b.w, b.h);
      }

      // floating numeric labels (subtle)
      ctx.fillStyle = 'rgba(180,230,255,0.06)'; ctx.font = '12px Inter, Arial';
      for(let i=0;i<6;i++){
        const tx = Math.floor(w*0.14 + i*(w*0.12));
        const ty = Math.floor(h*0.08 + Math.sin(now*0.001 + i)*12);
        ctx.fillText((Math.random()*1000|0).toString(), tx, ty);
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);

    return ()=>{ window.removeEventListener('resize', resize); if(rafRef.current) cancelAnimationFrame(rafRef.current); };
  },[]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default DataScienceBackground;
