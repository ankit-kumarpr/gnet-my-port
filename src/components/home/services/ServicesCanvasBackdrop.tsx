"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ServicesCanvasBackdropProps {
  activeIdx: number;
}

// Color palettes for the 6 services (primary particle accent + secondary glow)
const SERVICE_THEMES = [
  { primary: 0x00d6a0, secondary: 0x0e7490 }, // Web Dev: Emerald / Cyan
  { primary: 0x38bdf8, secondary: 0x00d6a0 }, // App Dev: Sky / Mint
  { primary: 0x10b981, secondary: 0xf59e0b }, // E-Comm: Emerald / Gold
  { primary: 0x6366f1, secondary: 0x00d6a0 }, // Software: Indigo / Emerald
  { primary: 0x14b8a6, secondary: 0x38bdf8 }, // SEO: Teal / Sky
  { primary: 0xec4899, secondary: 0x00d6a0 }, // UI/UX: Rose / Emerald
];

export default function ServicesCanvasBackdrop({ activeIdx }: ServicesCanvasBackdropProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(SERVICE_THEMES[activeIdx] || SERVICE_THEMES[0]);

  useEffect(() => {
    themeRef.current = SERVICE_THEMES[activeIdx] || SERVICE_THEMES[0];
  }, [activeIdx]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return; // WebGL not available, fallback to CSS ambient gradients
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 85;
    camera.position.y = 10;

    // Create a 3D perspective grid of particles representing digital architecture
    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const baseColor = new THREE.Color(0x00d6a0);
    const targetColor = new THREE.Color(themeRef.current.primary);
    const currentColor = new THREE.Color(themeRef.current.primary);

    for (let i = 0; i < particleCount; i++) {
      // Disperse in a wide curved floor plane with gentle elevation
      const x = (Math.random() - 0.5) * 160;
      const z = (Math.random() - 0.5) * 140;
      const y = -18 + Math.sin(x * 0.05) * Math.cos(z * 0.05) * 6 + (Math.random() - 0.5) * 4;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation between emerald, muted cyan, and soft silver
      const blend = Math.random();
      const col = blend > 0.6 ? baseColor : new THREE.Color(0x334155);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = Math.random() * 2.2 + 0.8;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Particle Material with additive blending for glowing effect
    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connecting spline lines between key structural nodes
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const step = 6;
    for (let i = 0; i < particleCount; i += step) {
      for (let j = i + step; j < Math.min(i + step * 3, particleCount); j += step) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 22) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    linesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00d6a0,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 10;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = normX * 12;
      mouseY = -normY * 8;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Optimization: Pause loop when not in view
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || document.hidden) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth color morphing to active service accent
      targetColor.setHex(themeRef.current.primary);
      currentColor.lerp(targetColor, 0.04);
      linesMaterial.color.copy(currentColor);

      // Camera gentle floating + mouse response
      targetCameraX = mouseX;
      targetCameraY = 10 + mouseY;
      camera.position.x += (targetCameraX - camera.position.x) * 0.035;
      camera.position.y += (targetCameraY - camera.position.y) * 0.035;
      camera.lookAt(0, -6, 0);

      // Organic subtle wave in particle positions
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const x = posArr[i * 3];
        const z = posArr[i * 3 + 2];
        posArr[i * 3 + 1] =
          -18 +
          Math.sin(x * 0.06 + elapsedTime * 0.8) * Math.cos(z * 0.06 + elapsedTime * 0.7) * 4.5;
      }
      posAttr.needsUpdate = true;

      // Slow rotational drift
      particles.rotation.y = elapsedTime * 0.02;
      lines.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-75"
      aria-hidden="true"
    />
  );
}
