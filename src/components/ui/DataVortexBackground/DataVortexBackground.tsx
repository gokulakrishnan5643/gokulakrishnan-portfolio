import React, { useEffect, useRef } from 'react';
import styles from './DataVortexBackground.module.scss';

export const DataVortexBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let w = 0; let h = 0; let dpr = 1;

    function resize(){
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    let t0 = performance.now();
    function draw(now:number){
      const t = (now - t0) * 0.001; // seconds
      ctx.clearRect(0,0,w,h);

      // background gradient (dark, deep blue)
      const bg = ctx.createLinearGradient(0,0,w,h);
      bg.addColorStop(0,'#020712');
      bg.addColorStop(1,'#001522');
      ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);

      // subtle vignette
      const vg = ctx.createRadialGradient(w/2,h/2, Math.min(w,h)*0.08, w/2,h/2, Math.max(w,h));
      vg.addColorStop(0,'rgba(10,20,30,0.0)');
      vg.addColorStop(1,'rgba(0,0,0,0.45)');
      ctx.fillStyle = vg; ctx.fillRect(0,0,w,h);

      // cinematic zoom: slight oscillating scale to loop smoothly
      const zoom = 1 + 0.02 * Math.sin(t*0.6);
      ctx.save();
      ctx.translate(w/2, h/2);
      ctx.scale(zoom, zoom);
      ctx.translate(-w/2, -h/2);

      // rotating rings
      const ringCount = 6;
      for(let i=0;i<ringCount;i++){
        const rr = (Math.min(w,h) * (0.12 + i*0.09));
        const angle = t * (0.12 + i*0.06) * (i%2?1:-1);
        ctx.save();
        ctx.translate(w/2, h/2);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.lineWidth = Math.max(1, 2.2 - i*0.28);
        const ringGrad = ctx.createLinearGradient(-rr,-rr,rr,rr);
        const tone = 160 - i*12;
        ringGrad.addColorStop(0, `rgba(${tone},${220},255,${0.06 + 0.08*i})`);
        ringGrad.addColorStop(0.6, `rgba(${Math.max(80,tone-40)},${170},255,${0.02 + 0.04*i})`);
        ringGrad.addColorStop(1, `rgba(10,30,60,0.0)`);
        ctx.strokeStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(0,0, rr, 0, Math.PI*2);
        ctx.stroke();

        // segmented glow dashes
        const dashCount = 36 + i*6;
        for(let d=0; d<dashCount; d++){
          const a = (d/dashCount) * Math.PI*2;
          const px = Math.cos(a) * rr;
          const py = Math.sin(a) * rr;
          const pLen = 8 + (i*1.2);
          const alpha = 0.06 + 0.18*Math.abs(Math.sin(a*2 + t*0.8 + i));
          ctx.fillStyle = `rgba(90,200,255,${alpha})`;
          ctx.fillRect(px-1.2, py-1.2, pLen*0.06, pLen*0.06);
        }

        ctx.restore();
      }

      // smooth particle streams along a spiral toward center
      const particleCount = Math.max(120, Math.floor(w/8));
      for(let p=0;p<particleCount;p++){
        const pct = (p/particleCount + (t*0.05)) % 1;
        const radius = Math.max(w,h) * (0.02 + pct*0.8);
        const spin = t * 0.8 + pct * Math.PI * 6;
        const x = w/2 + Math.cos(spin) * radius * (0.9 - pct*0.6);
        const y = h/2 + Math.sin(spin) * radius * (0.9 - pct*0.6);
        const size = 0.6 + (1-pct)*2.4;
        const alpha = 0.08 + (1-pct)*0.7;
        ctx.fillStyle = `rgba(120,200,255,${alpha})`;
        ctx.beginPath(); ctx.arc(x,y,size,0,Math.PI*2); ctx.fill();
      }

      // holographic UI elements: floating translucent panels + grid lines
      ctx.save();
      ctx.globalAlpha = 0.9;
      const panelW = Math.min(w*0.22, 420);
      const panelH = Math.min(h*0.16, 160);
      const panelX = w*0.08; const panelY = h*0.12 + Math.sin(t*0.9)*8;
      // left panel
      ctx.fillStyle = 'rgba(10,30,60,0.18)'; ctx.fillRect(panelX, panelY, panelW, panelH);
      ctx.strokeStyle = 'rgba(110,230,255,0.18)'; ctx.lineWidth = 1; ctx.strokeRect(panelX, panelY, panelW, panelH);
      // inner rows
      ctx.strokeStyle = 'rgba(110,230,255,0.06)';
      for(let r=1;r<4;r++){
        const yy = panelY + (r*(panelH/4));
        ctx.beginPath(); ctx.moveTo(panelX+10, yy); ctx.lineTo(panelX+panelW-10, yy); ctx.stroke();
      }

      // center holographic rings overlay (faint)
      ctx.beginPath(); ctx.lineWidth = 1.2; ctx.strokeStyle = 'rgba(140,220,255,0.06)';
      ctx.arc(w/2, h/2, Math.min(w,h)*0.14, 0, Math.PI*2); ctx.stroke();
      ctx.restore();

      ctx.restore(); // undo zoom transform

      // subtle film grain / noise overlay
      ctx.fillStyle = 'rgba(0,0,0,0)';
      // (kept empty to keep performance; can add per-pixel noise if needed)

      // loop
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => { window.removeEventListener('resize', resize); if(rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default DataVortexBackground;
