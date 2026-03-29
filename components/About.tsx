'use client';

import React from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import '../app/theme';

const AboutContainer = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Title = styled(motion.h2).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  font-size: clamp(2rem, 4vw, 3rem);
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
`;

const Description = styled(motion.p).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: bold;
`;

const Stats = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Stat = styled(motion.div)`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AboutImage = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const ImageFrame = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.glow};
  max-width: 320px;
  height: 450px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 255, 0.1));
    z-index: 0;
    animation: ${gradientShift} 4s ease infinite;
  }
`;

const PlaceholderImage = styled.div`
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
`;

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <AboutContainer id="about">
      <AboutContent>
        <AboutText
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Title variants={itemVariants}>About Me</Title>
          <Description variants={itemVariants}>
            Hello! I'm <Highlight>Saran</Highlight>, a <Highlight>Full-Stack Developer</Highlight> passionate about building beautiful and functional web applications that solve real-world problems. With 2+ years of professional experience, I've worked with cutting-edge technologies to deliver high-quality digital solutions.
          </Description>
          <Description variants={itemVariants}>
            My journey in tech started with a curiosity about how things work, which evolved into a deep expertise in modern web development. I specialize in <Highlight>React</Highlight>, <Highlight>Node.js</Highlight>, and <Highlight>TypeScript</Highlight>, and I'm constantly learning new technologies to stay ahead of the curve. I believe in clean code, great user experiences, and collaborating with amazing teams to build products that matter.
          </Description>
          <Stats variants={itemVariants}>
            <Stat>
              <StatNumber>50+</StatNumber>
              <StatLabel>Projects Completed</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>2+</StatNumber>
              <StatLabel>Years Experience</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>10+</StatNumber>
              <StatLabel>Technologies</StatLabel>
            </Stat>
          </Stats>
        </AboutText>
        <AboutImage
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ImageFrame>
            <Image 
              src="/profile.jpg" 
              alt="S.Saran" 
              fill
              style={{ borderRadius: '15px', objectFit: 'cover', zIndex: 1, padding: '10px' }}
            />
          </ImageFrame>
        </AboutImage>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;