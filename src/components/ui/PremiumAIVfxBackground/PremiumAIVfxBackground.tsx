import React, { useEffect, useRef } from 'react';
import styles from './PremiumAIVfxBackground.module.scss';

type Particle = { x:number;y:number;vx:number;vy:number;life:number;size:number };
type Node = { x:number;y:number;r:number };

export const PremiumAIVfxBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x:0, y:0 });

  useEffect(()=>{
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let w = 0; let h = 0; let dpr = 1;

    function initNodes(){
      const arr:Node[] = [];
      const count = 20;
      for(let i=0;i<count;i++){
        const a = (i/count) * Math.PI*2;
        const radius = Math.min(w,h) * (0.18 + (i%3)*0.03);
        const x = w/2 + Math.cos(a) * radius;
        const y = h/2 + Math.sin(a) * radius * 0.75;
        arr.push({ x,y,r: 1.2 + Math.random()*2.4 });
      }
      nodesRef.current = arr;
    }

    function spawnParticles(cx:number, cy:number, n=40){
      const arr = particlesRef.current;
      for(let i=0;i<n;i++){
        const ang = Math.random()*Math.PI*2;
        const sp = 40 + Math.random()*360;
        arr.push({ x:cx, y:cy, vx:Math.cos(ang)*sp, vy:Math.sin(ang)*sp, life:0.6 + Math.random()*1.8, size: 0.8 + Math.random()*2.6 });
      }
      if(arr.length > 2000) particlesRef.current = arr.slice(-1500);
    }

    function resize(){
      w = canvas.clientWidth || window.innerWidth; h = canvas.clientHeight || window.innerHeight; dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(w*dpr); canvas.height = Math.floor(h*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
      initNodes();
    }

    let last = performance.now();
    function draw(now:number){
      const dt = Math.min(40, now - last) * 0.001; last = now;
      ctx.clearRect(0,0,w,h);

      // dark cinematic background
      const bg = ctx.createLinearGradient(0,0,w,h); bg.addColorStop(0,'#02050a'); bg.addColorStop(1,'#00161e');
      ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);

      // volumetric glow behind core
      const coreX = w/2, coreY = h/2;
      const coreR = Math.min(w,h) * 0.08 * (1 + 0.04*Math.sin(now*0.002));
      const glow = ctx.createRadialGradient(coreX,coreY,0,coreX,coreY,coreR*4);
      glow.addColorStop(0,'rgba(100,220,255,0.14)'); glow.addColorStop(0.35,'rgba(50,140,220,0.08)'); glow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = glow; ctx.fillRect(0,0,w,h);

      // holographic HUD rings
      ctx.save(); ctx.translate(coreX, coreY);
      for(let i=0;i<6;i++){
        const r = coreR * (1.6 + i*0.8);
        const ang = now*0.0006*(i%2?1:-1)*(1 + i*0.14);
        ctx.save(); ctx.rotate(ang);
        ctx.lineWidth = 1 + (0.6 - i*0.08);
        const lg = ctx.createLinearGradient(-r,-r,r,r);
        lg.addColorStop(0,'rgba(160,240,255,0.08)'); lg.addColorStop(1,'rgba(50,80,120,0.0)');
        ctx.strokeStyle = lg; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.stroke();
        // rotating dashes
        const dcount = 28 + i*8;
        for(let d=0; d<dcount; d++){
          const a = (d/dcount)*Math.PI*2;
          const px = Math.cos(a)*r; const py = Math.sin(a)*r;
          const alpha = 0.04 + 0.24*Math.abs(Math.sin(a*2 + now*0.002 + i));
          ctx.fillStyle = `rgba(140,230,255,${alpha})`;
          ctx.fillRect(px-0.9, py-0.9, 2.0, 2.0);
        }
        ctx.restore();
      }
      ctx.restore();

      // interactive parallax: move nodes slightly toward mouse
      const mx = mouseRef.current.x || w/2; const my = mouseRef.current.y || h/2;
      for(const n of nodesRef.current){
        const dx = (mx - n.x) * 0.0025; const dy = (my - n.y) * 0.0025;
        n.x += dx * 18 * dt; n.y += dy * 18 * dt;
      }

      // animated neural network connections
      const nodes = nodesRef.current;
      ctx.lineWidth = 0.8;
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const a = nodes[i]; const b = nodes[j];
          const dx = a.x - b.x; const dy = a.y - b.y; const d2 = dx*dx + dy*dy;
          if(d2 < (Math.min(w,h)*0.6)*(Math.min(w,h)*0.6)){
            const alpha = 0.12 * (1 - d2 / ((Math.min(w,h)*0.6)*(Math.min(w,h)*0.6)));
            ctx.strokeStyle = `rgba(120,220,255,${alpha})`;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }

      // draw nodes
      for(const n of nodes){
        const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,8);
        g.addColorStop(0,'rgba(190,255,255,0.95)'); g.addColorStop(0.25,'rgba(90,200,255,0.45)'); g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x,n.y, n.r, 0, Math.PI*2); ctx.fill();
      }

      // robotic eye scan - sweeping beam across core
      ctx.save();
      const scanAngle = (now*0.0012) % (Math.PI*2);
      ctx.translate(coreX, coreY); ctx.rotate(scanAngle);
      ctx.fillStyle = 'rgba(160,240,255,0.06)'; ctx.beginPath(); ctx.ellipse(0, coreR*0.4, coreR*3, coreR*0.6, 0, -0.2, 0.2); ctx.fill();
      ctx.restore();

      // particle bursts and streams
      for(let i=particlesRef.current.length-1;i>=0;i--){
        const p = particlesRef.current[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
        const alpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = `rgba(180,255,255,${alpha*0.95})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
        if(p.life <= 0) particlesRef.current.splice(i,1);
      }

      // humanoid emergence hint: denser particle cloud forming head/shoulder silhouette
      const silhouetteAlpha = 0.06 + 0.06*Math.sin(now*0.002);
      for(let s=0;s<180;s++){
        const fy = s/180; const sx = coreX + (Math.sin(fy*12 + now*0.002)*40) - 12;
        const sy = coreY - coreR*1.2 + fy * coreR * 3.1;
        const sr = 0.4 + Math.random()*1.5;
        ctx.fillStyle = `rgba(160,230,255,${silhouetteAlpha*(1-fy)})`;
        ctx.beginPath(); ctx.arc(sx, sy + (Math.sin(now*0.001 + s)*2), sr, 0, Math.PI*2); ctx.fill();
      }

      // subtle HUD panels
      ctx.save(); ctx.globalAlpha = 0.9;
      const pw = Math.min(w*0.22,420); const ph = Math.min(h*0.16,160);
      const px = w*0.06; const py = h*0.12;
      ctx.fillStyle = 'rgba(8,18,30,0.16)'; ctx.fillRect(px,py,pw,ph);
      ctx.strokeStyle = 'rgba(120,220,255,0.08)'; ctx.strokeRect(px,py,pw,ph);
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e)=>{ mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; });
    rafRef.current = requestAnimationFrame(draw);

    return ()=>{ window.removeEventListener('resize', resize); if(rafRef.current) cancelAnimationFrame(rafRef.current); };
  },[]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default PremiumAIVfxBackground;
