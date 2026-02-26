import { useEffect } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color('#6c63ff'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#f472b6'),
      new THREE.Color('#a5b4fc'),
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({ size: 1.2, vertexColors: true, transparent: true, opacity: 0.75, sizeAttenuation: true });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.4;
      my = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize',    onResize);

    let frame = 0;
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      frame++;
      points.rotation.y = frame * 0.0006 + mx;
      points.rotation.x = frame * 0.0003 + my;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize',    onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <canvas id="bg-canvas" />;
}
