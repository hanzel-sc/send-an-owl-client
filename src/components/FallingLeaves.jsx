import React, { useEffect, useState } from 'react';

const LEAF_COUNT = 6;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FallingLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const initial = Array.from({ length: LEAF_COUNT }, (_, i) => createLeaf(i));
    setLeaves(initial);
  }, []);

  return (
    <>
      {leaves.map((leaf) => (
        <img
          key={leaf.id}
          src="/assets/leaf.png"
          alt=""
          aria-hidden="true"
          className="leaf"
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            opacity: leaf.opacity,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            '--drift': `${leaf.drift}px`,
            '--rotation': `${leaf.rotation}deg`,
          }}
        />
      ))}
    </>
  );
}

function createLeaf(index) {
  return {
    id: index,
    left: randomBetween(5, 95),
    size: randomBetween(24, 48),
    opacity: randomBetween(0.3, 0.7),
    duration: randomBetween(12, 22),
    delay: randomBetween(0, 10),
    drift: randomBetween(-60, 60),
    rotation: randomBetween(180, 720),
  };
}
