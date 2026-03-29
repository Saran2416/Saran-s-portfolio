'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import '../app/theme';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: ${({ theme }) => theme.colors.primary}; }
`;

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1a1a1a;
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 0 2rem;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(0, 255, 204, 0.1) 0%, transparent 50%);
  animation: ${gradientShift} 20s ease infinite reverse;
`;

const Name = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  background: linear-gradient(45deg, #ffffff, #e0e0e0, #c0c0c0);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 3s ease infinite;
  margin-bottom: 1rem;
  z-index: 2;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 40px rgba(224, 224, 224, 0.4));
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
`;

const RoleContainer = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  z-index: 2;
`;

const Role = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.15em solid ${({ theme }) => theme.colors.primary};
  width: 0;
  animation: ${typing} 2s steps(30, end) forwards, ${blinkCaret} 0.75s step-end infinite;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Button = styled(motion.a)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  background: ${({ theme }) => theme.gradients.button};
  color: #000;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.glow};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.6);
    transform: translateY(-3px);
  }
`;

const Hero = () => {
  const roles = ["Aspiring Developer", "Tech Enthusiast", "Vibe Coder", "Problem Solver"];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const role = roles[currentRole];
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < role.length) {
        setDisplayText(role.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
          setDisplayText("");
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentRole]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer id="hero">
      <AnimatedBackground />
      <Name
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        S.Saran
      </Name>
      <RoleContainer>
        <Role>{displayText}</Role>
      </RoleContainer>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.7)',
          maxWidth: '600px',
          margin: '1rem 0 2rem 0',
          zIndex: 2
        }}
      >
        Building beautiful, performant web applications with modern technologies. Passionate about solving complex problems and creating exceptional user experiences.
      </motion.p>
      <ButtonContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Button
          href="#projects"
          onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Projects
        </Button>
        <Button
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
        </Button>
      </ButtonContainer>
    </HeroContainer>
  );
};

export default Hero;