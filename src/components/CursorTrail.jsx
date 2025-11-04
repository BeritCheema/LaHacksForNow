import { useEffect, useRef } from 'react';

const MAX_PARTICLES = 100;
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
    const rocket = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      angle: 0,
    };

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
      rocket.targetX = event.clientX;
      rocket.targetY = event.clientY;
      addParticle(event.clientX, event.clientY);
    };

    const update = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      context.clearRect(0, 0, width, height);

      const followSpeed = Math.min(1, delta * 14);
      const dx = rocket.targetX - rocket.x;
      const dy = rocket.targetY - rocket.y;
      rocket.x += dx * followSpeed;
      rocket.y += dy * followSpeed;
      const angleTarget = Math.atan2(dy, dx);
      const angleDiff = ((angleTarget - rocket.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      rocket.angle += angleDiff * Math.min(1, delta * 10);

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

        gradient.addColorStop(0, `rgba(255, 180, 60, ${0.45 * fade})`);
        gradient.addColorStop(0.5, `rgba(255, 120, 40, ${0.25 * fade})`);
        gradient.addColorStop(1, 'rgba(255, 80, 20, 0)');

        context.beginPath();
        context.fillStyle = gradient;
        context.arc(particle.x, particle.y, 12, 0, Math.PI * 2);
        context.fill();
      }

      // Draw rocket cursor
      const flamePulse = (Math.sin(now / 80) + 1) / 2;
      const flameLength = 22 + flamePulse * 14;

      context.save();
      context.translate(rocket.x, rocket.y);
      context.rotate(rocket.angle + Math.PI / 2);

      const flameGradient = context.createLinearGradient(0, 12, 0, 12 + flameLength);
      flameGradient.addColorStop(0, 'rgba(255, 200, 80, 0.9)');
      flameGradient.addColorStop(0.6, 'rgba(255, 140, 40, 0.7)');
      flameGradient.addColorStop(1, 'rgba(255, 70, 30, 0)');

      context.beginPath();
      context.moveTo(0, 12);
      context.lineTo(7, 12 + flameLength);
      context.lineTo(-7, 12 + flameLength);
      context.closePath();
      context.fillStyle = flameGradient;
      context.fill();

      context.fillStyle = '#fb923c';
      context.beginPath();
      context.moveTo(-8, 10);
      context.lineTo(-18, 18);
      context.lineTo(-4, 12);
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(8, 10);
      context.lineTo(18, 18);
      context.lineTo(4, 12);
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(0, -22);
      context.quadraticCurveTo(13, -4, 9, 14);
      context.lineTo(-9, 14);
      context.quadraticCurveTo(-13, -4, 0, -22);
      context.closePath();
      context.fillStyle = '#e2e8f0';
      context.fill();
      context.lineWidth = 1.6;
      context.strokeStyle = '#94a3b8';
      context.stroke();

      context.beginPath();
      context.moveTo(-9, 8);
      context.lineTo(9, 8);
      context.strokeStyle = 'rgba(148, 163, 184, 0.6)';
      context.lineWidth = 1.2;
      context.stroke();

      context.beginPath();
      context.arc(0, -6, 4.8, 0, Math.PI * 2);
      context.fillStyle = '#38bdf8';
      context.fill();
      context.lineWidth = 1.4;
      context.strokeStyle = '#1e3a8a';
      context.stroke();

      context.beginPath();
      context.arc(-1.4, -7.4, 1.2, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 255, 255, 0.85)';
      context.fill();

      context.restore();

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
