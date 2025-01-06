"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const GlareCard = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setMouseEnter(true);
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setMouseEnter(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      className={`relative overflow-hidden ${containerClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className={className}>{children}</div>
      <AnimatePresence>
        {mouseEnter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -inset-px opacity-0"
            style={{
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

