'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import '../app/theme';

const ParallaxContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const ParallaxLayer = styled.div<{ speed: number }>`
  position: absolute;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(0, 255, 204, 0.03) 0%, transparent 50%);
  transform: translate(-10%, -10%);
  animation: float 20s ease-in-out infinite;
`;

const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        containerRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ParallaxContainer ref={containerRef}>
      <ParallaxLayer speed={0.5} />
    </ParallaxContainer>
  );
};

export default ParallaxBackground;