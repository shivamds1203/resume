import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    let mx = rx, my = ry;
    const lerp = (a, b, n) => a + (b - a) * n;

    const onMouse = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };
    window.addEventListener('mousemove', onMouse);

    let rafId;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  );
}
