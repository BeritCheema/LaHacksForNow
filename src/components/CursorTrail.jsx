import { useEffect, useRef } from 'react';

const MAX_PARTICLES = 60;
const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    resize();

    const particles = [];
    let animationFrame;
    let lastTime = performance.now();

    const addParticle = (x, y) => {
      particles.push({
        x,
        y,
        life: 0,
        maxLife: 0.6 + Math.random() * 0.4,
        velocity: {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
        },
      });

      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }
    };

    const handlePointerMove = (event) => {
      addParticle(event.clientX, event.clientY);
    };

    const update = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      context.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.life += delta;

        if (particle.life > particle.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = particle.life / particle.maxLife;
        particle.x += particle.velocity.x * delta * (1 - progress);
        particle.y += particle.velocity.y * delta * (1 - progress);

        const fade = 1 - progress;
        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          12
        );

        gradient.addColorStop(0, `rgba(0, 191, 255, ${0.35 * fade})`);
        gradient.addColorStop(0.5, `rgba(0, 191, 255, ${0.2 * fade})`);
        gradient.addColorStop(1, 'rgba(0, 191, 255, 0)');

        context.beginPath();
        context.fillStyle = gradient;
        context.arc(particle.x, particle.y, 12, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('resize', resize);
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', resize);
      document.body.style.cursor = originalCursor;
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-30" />;
};

export default CursorTrail;
