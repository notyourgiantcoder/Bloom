"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ShapeConfig {
  baseHeight: number;
  minHeight: number;
  maxHeight: number;
  /** Probability of being a dot on any given cycle (0–1) */
  dotChance: number;
}

const SHAPES: ShapeConfig[] = [
  { baseHeight: 18, minHeight: 10, maxHeight: 26, dotChance: 0.25 },
  { baseHeight: 5, minHeight: 3.5, maxHeight: 8, dotChance: 0.65 },
  { baseHeight: 24, minHeight: 14, maxHeight: 34, dotChance: 0.15 },
  { baseHeight: 30, minHeight: 20, maxHeight: 40, dotChance: 0.1 },
  { baseHeight: 26, minHeight: 16, maxHeight: 36, dotChance: 0.12 },
  { baseHeight: 5.5, minHeight: 3.5, maxHeight: 8, dotChance: 0.6 },
  { baseHeight: 20, minHeight: 12, maxHeight: 30, dotChance: 0.2 },
  { baseHeight: 14, minHeight: 6, maxHeight: 22, dotChance: 0.3 },
];

export default function HeroGraphic() {
  const [heights, setHeights] = useState<number[]>(
    SHAPES.map((s) => s.baseHeight)
  );
  const [offsets, setOffsets] = useState<number[]>(SHAPES.map(() => 0));
  const [isDot, setIsDot] = useState<boolean[]>(
    SHAPES.map((s) => s.dotChance > 0.5)
  );
  const [clickedIds, setClickedIds] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // Each shape animates independently: height, offset, AND type morph
  useEffect(() => {
    const intervals = SHAPES.map((shape, i) => {
      const duration = 1600 + Math.random() * 2400;
      return setInterval(() => {
        setHeights((prev) => {
          const next = [...prev];
          next[i] =
            shape.minHeight +
            Math.random() * (shape.maxHeight - shape.minHeight);
          return next;
        });
        setOffsets((prev) => {
          const next = [...prev];
          next[i] = (Math.random() - 0.5) * 20;
          return next;
        });
        // Randomly morph bar ↔ dot
        setIsDot((prev) => {
          const next = [...prev];
          next[i] = Math.random() < shape.dotChance;
          return next;
        });
      }, duration);
    });

    // Staggered initial kick
    SHAPES.forEach((shape, i) => {
      setTimeout(() => {
        setHeights((prev) => {
          const next = [...prev];
          next[i] =
            shape.minHeight +
            Math.random() * (shape.maxHeight - shape.minHeight);
          return next;
        });
        setOffsets((prev) => {
          const next = [...prev];
          next[i] = (Math.random() - 0.5) * 20;
          return next;
        });
        setIsDot((prev) => {
          const next = [...prev];
          next[i] = Math.random() < shape.dotChance;
          return next;
        });
      }, i * 120);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Cleanup click-flash timeouts on unmount
  useEffect(() => {
    const map = timeoutsRef.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Click → flash colour for 600ms then revert
  const handleClick = useCallback((id: number) => {
    const existing = timeoutsRef.current.get(id);
    if (existing) clearTimeout(existing);

    setClickedIds((prev) => new Set(prev).add(id));

    const timeout = setTimeout(() => {
      setClickedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      timeoutsRef.current.delete(id);
    }, 600);

    timeoutsRef.current.set(id, timeout);
  }, []);

  return (
    <div className="hero-graphic-dynamic">
      {SHAPES.map((_shape, i) => {
        const dot = isDot[i];
        const size = heights[i];
        // Dots: width = height (circle). Bars: fixed min-width, tall height.
        const dotSize = Math.min(size, 8); // cap dot diameter
        return (
          <div
            key={i}
            className={`hero-dyn-shape${dot ? " hero-dyn-shape--dot" : ""}${
              clickedIds.has(i) ? " hero-dyn-shape--flash" : ""
            }`}
            style={{
              height: dot ? `${dotSize}rem` : `${size}rem`,
              ...(dot
                ? { width: `${dotSize}rem`, minWidth: `${dotSize}rem` }
                : { width: "", minWidth: "" }),
              transform: `translateY(${offsets[i]}px)`,
            }}
            onClick={() => handleClick(i)}
            role="presentation"
          />
        );
      })}
    </div>
  );
}
