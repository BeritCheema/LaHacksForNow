import { useEffect, useRef } from 'react';

const STAR_COUNT = 160;

const createStar = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * height,
  depth: Math.random() * 0.8 + 0.2,
  radius: Math.random() * 1.2 + 0.4,
  twinkle: Math.random() * 0.6 + 0.4,
});

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(dpr, dpr);

    let stars = Array.from({ length: STAR_COUNT }, () => createStar(width, height));
    const parallax = { x: 0, y: 0 };
    let animationFrame;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
      stars = Array.from({ length: STAR_COUNT }, () => createStar(width, height));
    };

    const handlePointerMove = (event) => {
      const offsetX = event.clientX / width - 0.5;
      const offsetY = event.clientY / height - 0.5;
      parallax.x = offsetX;
      parallax.y = offsetY;
    };

    const render = (timestamp) => {
      context.clearRect(0, 0, width, height);
      const time = timestamp / 1000;

      stars.forEach((star) => {
        const offsetX = parallax.x * 30 * star.depth;
        const offsetY = parallax.y * 30 * star.depth;
        let x = star.x + offsetX;
        let y = star.y + offsetY;

        if (x < 0) x += width;
        if (x > width) x -= width;
        if (y < 0) y += height;
        if (y > height) y -= height;

        const alpha = 0.3 + Math.abs(Math.sin((time * star.twinkle + star.x) * 0.7)) * 0.4;
        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        context.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
};

export default Starfield;
