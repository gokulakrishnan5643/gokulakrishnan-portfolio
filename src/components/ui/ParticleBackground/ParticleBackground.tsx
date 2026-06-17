import React, { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.scss';

type Stream = { x:number; y:number; len:number; speed:number };
type Node = { x:number; y:number; r:number };

const PANEL_WIDTH_RATIO = 0.18; // fraction of width for side panels

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const leftNodesRef = useRef<Node[]>([]);
  const rightNodesRef = useRef<Node[]>([]);
  const streamsRef = useRef<Stream[]>([]);

  useEffect(()=>{
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let w = 0; let h = 0; let dpr = 1;

    function buildPanels(){
      const panelW = Math.floor(w * PANEL_WIDTH_RATIO);
      const rows = Math.max(6, Math.floor(h / 60));
      const left:Node[] = [];
      const right:Node[] = [];
      for(let r=0;r<rows;r++){
        const t = (r+0.5)/rows;
        const y = Math.floor(t * (h*0.9) + h*0.05 + Math.sin(r*1.3)*6);
        const lx = Math.floor(panelW * 0.25 + Math.sin(r*0.7)*6);
        const rx = Math.floor(w - panelW * 0.25 + Math.cos(r*0.9)*6);
        left.push({ x: lx, y, r: 1.6 + (r%3===0?1:0) });
        right.push({ x: rx, y, r: 1.6 + (r%3===0?1:0) });
      }
      leftNodesRef.current = left;
      rightNodesRef.current = right;
    }

    function initStreams(){
      const centerH = h;
      const count = Math.max(90, Math.floor(w/12));
      const arr:Stream[] = [];
      for(let i=0;i<count;i++){
        const y = Math.random() * centerH * 0.9 + centerH*0.05;
        const len = 20 + Math.random()*80;
        const speed = 80 + Math.random()*260;
        const x = -Math.random()*w;
        arr.push({ x, y, len, speed });
      }
      streamsRef.current = arr;
    }

    function resize(){
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      buildPanels();
      initStreams();
    }

    let last = performance.now();
    function draw(now:number){
      const dt = Math.min(40, now - last) * 0.001;
      last = now;
      ctx.clearRect(0,0,w,h);

      // background gradient
      const bg = ctx.createLinearGradient(0,0,w,h);
      bg.addColorStop(0,'#031428');
      bg.addColorStop(1,'#001318');
      ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);

      // draw side panels (circuit lines)
      const drawPanel = (nodes:Node[], left:boolean)=>{
        ctx.save();
        // panel glow
        const gw = Math.floor(w * PANEL_WIDTH_RATIO) + 6;
        const gx = left? -gw*0.2 : w - gw*0.8;
        const grad = ctx.createLinearGradient(gx,0,gx + (left?gw:-gw),h);
        grad.addColorStop(0,'rgba(80,30,220,0.06)');
        grad.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle = grad; ctx.fillRect(left?0:w-gw,0,gw,h);

        // draw connections
        for(let i=0;i<nodes.length;i++){
          const a = nodes[i];
          for(let j=i+1;j<Math.min(i+4,nodes.length);j++){
            const b = nodes[j];
            if(Math.random()>0.7) continue;
            ctx.beginPath();
            ctx.lineWidth = 1;
            const lineGrad = ctx.createLinearGradient(a.x,a.y,b.x,b.y);
            lineGrad.addColorStop(0,'rgba(110,200,255,0.9)');
            lineGrad.addColorStop(0.6,'rgba(120,100,255,0.45)');
            lineGrad.addColorStop(1,'rgba(130,80,255,0.06)');
            ctx.strokeStyle = lineGrad;
            ctx.moveTo(a.x,a.y);
            const cx = (a.x + b.x)/2 + (Math.random()-0.5)*12;
            const cy = (a.y + b.y)/2 + (Math.random()-0.5)*8;
            ctx.quadraticCurveTo(cx,cy,b.x,b.y);
            ctx.stroke();
          }
        }

        // draw nodes
        for(const n of nodes){
          const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,8);
          g.addColorStop(0,'rgba(160,255,245,0.95)');
          g.addColorStop(0.2,'rgba(100,200,255,0.35)');
          g.addColorStop(1,'rgba(20,10,30,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
        }
        ctx.restore();
      };

      drawPanel(leftNodesRef.current, true);
      drawPanel(rightNodesRef.current, false);

      // draw binary streams across center moving rightwards
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for(const s of streamsRef.current){
        s.x += s.speed * dt;
        if(s.x - s.len > w) s.x = -Math.random()*w*0.8;
        const count = Math.floor(s.len / 6);
        for(let k=0;k<count;k++){
          const bx = s.x + k*6;
          const by = s.y + Math.sin((s.x + k*8)*0.012 + k*0.15)*10;
          const alpha = 0.18 + 0.6*Math.random();
          ctx.fillStyle = `rgba(160,120,255,${alpha})`;
          ctx.fillRect(bx, by, 4, 2);
          if(Math.random() < 0.02){ // occasional bright bit
            ctx.fillStyle = 'rgba(200,255,255,0.9)'; ctx.fillRect(bx+1,by-1,2,4);
          }
        }
      }
      ctx.restore();

      // subtle center vignette
      const v = ctx.createRadialGradient(w/2,h/3,40,w/2,h/3, Math.max(w,h));
      v.addColorStop(0,'rgba(40,60,90,0.06)');
      v.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = v; ctx.fillRect(0,0,w,h);

      // tiny static particles for depth
      for(let p=0;p<120;p++){
        const x = (p*89 + Math.floor(now*0.03)) % w;
        const y = (p*37 + Math.sin(now*0.001 + p)*6) % h;
        ctx.fillStyle = 'rgba(160,200,255,0.02)';
        ctx.beginPath(); ctx.arc(x,y, 0.6,0,Math.PI*2); ctx.fill();
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

export default ParticleBackground;
