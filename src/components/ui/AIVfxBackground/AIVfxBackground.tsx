import React, { useEffect, useRef } from 'react';
import styles from './AIVfxBackground.module.scss';

type Particle = { x:number;y:number;vx:number;vy:number;life:number;size:number };
type Node = { x:number;y:number;r:number;strength:number };

export const AIVfxBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<Node[]>([]);

  useEffect(()=>{
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let w=0,h=0,dpr=1;

    function makeNodes(){
      const count = 28;
      const arr:Node[] = [];
      for(let i=0;i<count;i++){
        const a = (i/count) * Math.PI*2;
        const radius = Math.min(w,h)*0.24 + (Math.random()-0.5)*40;
        const x = w/2 + Math.cos(a) * radius;
        const y = h/2 + Math.sin(a) * radius * 0.7;
        arr.push({ x,y,r: 1 + Math.random()*2, strength: Math.random() });
      }
      nodesRef.current = arr;
    }

    function spawnBurst(cx:number, cy:number, count=80){
      const arr = particlesRef.current;
      for(let i=0;i<count;i++){
        const angle = Math.random()*Math.PI*2;
        const speed = 40 + Math.random()*240;
        arr.push({ x: cx, y: cy, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, life: 0.6 + Math.random()*1.4, size: 1 + Math.random()*3 });
      }
      // cap
      if(arr.length > 1500) particlesRef.current = arr.slice(-1200);
    }

    function resize(){
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(w*dpr); canvas.height = Math.floor(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      makeNodes();
    }

    let last = performance.now();
    function draw(now:number){
      const dt = Math.min(40, now - last) * 0.001; last = now;
      ctx.clearRect(0,0,w,h);

      // deep background
      const bg = ctx.createLinearGradient(0,0,w,h);
      bg.addColorStop(0,'#030812'); bg.addColorStop(1,'#001018');
      ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);

      // central core (pulsing)
      const t = now * 0.001;
      const corePulse = 1 + 0.12 * Math.sin(t*2.4);
      const coreR = Math.min(w,h) * 0.06 * corePulse;
      const coreX = w/2; const coreY = h/2;
      const coreGrad = ctx.createRadialGradient(coreX,coreY,0,coreX,coreY,coreR*2);
      coreGrad.addColorStop(0,'rgba(100,220,255,0.95)');
      coreGrad.addColorStop(0.25,'rgba(60,160,230,0.45)');
      coreGrad.addColorStop(1,'rgba(10,10,30,0)');
      ctx.fillStyle = coreGrad; ctx.beginPath(); ctx.arc(coreX,coreY, coreR,0,Math.PI*2); ctx.fill();

      // occasional bursts from core
      if(Math.random() < 0.02) spawnBurst(coreX + (Math.random()-0.5)*20, coreY + (Math.random()-0.5)*20, 48);

      // rotating holographic circles around core
      ctx.save(); ctx.translate(coreX, coreY);
      for(let i=0;i<5;i++){
        const r = coreR * (1.6 + i*0.9);
        const a = t * (0.25 + i*0.06) * (i%2?1:-1);
        ctx.save(); ctx.rotate(a);
        ctx.lineWidth = 1 + (0.6 - i*0.08);
        const ringGrad = ctx.createLinearGradient(-r,-r,r,r);
        ringGrad.addColorStop(0,'rgba(120,220,255,0.12)'); ringGrad.addColorStop(1,'rgba(30,70,110,0)');
        ctx.strokeStyle = ringGrad; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.stroke();
        // dashes
        const dcount = 24 + i*12;
        for(let d=0; d<dcount; d++){
          const ang = (d/dcount)*Math.PI*2;
          const lx = Math.cos(ang)*r; const ly = Math.sin(ang)*r;
          const alpha = 0.04 + 0.18*Math.sin(ang*3 + t*0.8 + i);
          ctx.fillStyle = `rgba(160,230,255,${alpha})`;
          ctx.fillRect(lx-0.9, ly-0.9, 2.2, 2.2);
        }
        ctx.restore();
      }
      ctx.restore();

      // animated neural network: nodes and connecting lines
      const nodes = nodesRef.current;
      for(const n of nodes){
        // jitter
        n.x += (Math.random()-0.5) * 6 * dt * 30;
        n.y += (Math.random()-0.5) * 3 * dt * 30;
      }
      // draw lines
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const a = nodes[i]; const b = nodes[j];
          const dx = a.x - b.x; const dy = a.y - b.y; const d2 = dx*dx + dy*dy;
          if(d2 < (Math.min(w,h)*0.6)*(Math.min(w,h)*0.6)){
            const alpha = 0.12 * (1 - d2 / (Math.min(w,h)*0.6*(Math.min(w,h)*0.6)));
            ctx.strokeStyle = `rgba(110,220,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      // draw nodes
      for(const n of nodes){
        const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,8);
        g.addColorStop(0,'rgba(180,250,255,0.95)'); g.addColorStop(0.3,'rgba(80,200,240,0.35)'); g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x,n.y, 1.6 + n.strength*1.4, 0, Math.PI*2); ctx.fill();
      }

      // robotic eye scan: vertical scanning bar over core
      ctx.save();
      const scanW = Math.max(2, Math.sin(t*1.8)*4 + 6);
      const scanX = coreX + Math.cos(t*0.9) * coreR * 0.6;
      const scanGrad = ctx.createLinearGradient(scanX - scanW*2, coreY, scanX + scanW*2, coreY);
      scanGrad.addColorStop(0,'rgba(20,60,90,0)'); scanGrad.addColorStop(0.5,'rgba(180,240,255,0.18)'); scanGrad.addColorStop(1,'rgba(20,60,90,0)');
      ctx.fillStyle = scanGrad; ctx.fillRect(scanX - scanW*6, coreY - coreR*1.2, scanW*12, coreR*2.4);
      ctx.restore();

      // update and draw particles
      const parts = particlesRef.current;
      for(let i=parts.length-1;i>=0;i--){
        const p = parts[i];
        p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
        const alpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = `rgba(180,255,255,${alpha*0.9})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
        if(p.life <= 0) parts.splice(i,1);
      }

      // form humanoid silhouette hint (point cloud) - subtle
      const silhouetteCount = 120;
      for(let s=0;s<silhouetteCount;s++){
        const fy = s / silhouetteCount;
        const sx = coreX - 24 + (Math.sin(fy*12 + t*0.9)*32) + (Math.random()-0.5)*6;
        const sy = coreY - coreR*1.4 + fy * coreR * 3.6 + (Math.random()-0.5)*6;
        const sr = 0.6 + Math.random()*1.6;
        ctx.fillStyle = `rgba(160,220,255,${0.05 + (1-fy)*0.18})`;
        ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI*2); ctx.fill();
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

export default AIVfxBackground;
