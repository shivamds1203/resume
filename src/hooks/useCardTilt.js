import { useEffect } from 'react';

export function useCardTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll('.tilt-card');

    const handlers = [];
    cards.forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -8;
        const rotY = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
        card.style.setProperty('--mx', `${((x / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${((y / rect.height) * 100).toFixed(1)}%`);
      };
      const onLeave = () => { card.style.transform = ''; };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ card, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);
}
