'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import '../app/theme';

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.5), 0 0 60px rgba(255, 0, 255, 0.3);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const CursorCore = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background: linear-gradient(45deg, #00d4ff, #00ffcc);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  animation: ${glow} 2s ease-in-out infinite, ${pulse} 1.5s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
`;

const CursorRing = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  border: 2px solid transparent;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  background: conic-gradient(from 0deg, #00d4ff, #00ffcc, #ff00ff, #00d4ff);
  -webkit-mask: radial-gradient(circle, transparent 40%, black 100%);
  mask: radial-gradient(circle, transparent 40%, black 100%);
  transition: transform 0.15s ease-out;
`;

const TrailDot = styled.div<{ opacity: number; size: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(circle, rgba(0, 212, 255, ${props => props.opacity}), rgba(0, 255, 204, ${props => props.opacity * 0.5}));
  border-radius: 50%;
  pointer-events: none;
  z-index: 9997;
  box-shadow: 0 0 ${props => props.size * 2}px rgba(0, 212, 255, ${props => props.opacity * 0.6});
`;

const CursorLabel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  font-size: 0.8rem;
  color: #00d4ff;
  pointer-events: none;
  z-index: 9996;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  opacity: number;
  size: number;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [label, setLabel] = useState('');
  const trailIdRef = React.useRef(0);

  useEffect(() => {
    let frameCount = 0;
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add trail effect every 2 frames
      frameCount++;
      if (frameCount % 2 === 0) {
        const newTrailPoint: TrailPoint = {
          x: e.clientX,
          y: e.clientY,
          id: trailIdRef.current++,
          opacity: 1,
          size: 8,
        };
        setTrail(prev => [...prev.slice(-15), newTrailPoint]);
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      setLabel('Click');
    };
    const handleMouseLeave = () => {
      setIsHovering(false);
      setLabel('');
    };

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', updateMousePosition);

    // Animate trail opacity decay
    const trailInterval = setInterval(() => {
      setTrail(prev =>
        prev
          .map(point => ({
            ...point,
            opacity: point.opacity - 0.1,
            size: Math.max(2, point.size - 0.5),
          }))
          .filter(point => point.opacity > 0.05)
      );
    }, 30);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      clearInterval(trailInterval);
    };
  }, []);

  return (
    <>
      {/* Trail effect */}
      {trail.map(point => (
        <TrailDot
          key={point.id}
          style={{
            left: `${point.x - point.size / 2}px`,
            top: `${point.y - point.size / 2}px`,
          }}
          opacity={point.opacity}
          size={point.size}
        />
      ))}

      {/* Main cursor ring */}
      <CursorRing
        style={{
          left: `${mousePosition.x - 25}px`,
          top: `${mousePosition.y - 25}px`,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      {/* Cursor core */}
      <CursorCore
        style={{
          left: `${mousePosition.x - 6}px`,
          top: `${mousePosition.y - 6}px`,
        }}
      />

      {/* Hover label */}
      <CursorLabel
        style={{
          left: `${mousePosition.x + 20}px`,
          top: `${mousePosition.y + 20}px`,
          opacity: isHovering ? 1 : 0,
        }}
      >
        {label}
      </CursorLabel>
    </>
  );
};

export default CustomCursor;