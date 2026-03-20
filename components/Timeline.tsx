'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../app/theme';

const TimelineContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, rgba(22, 26, 62, 0.5) 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
  text-align: center;
`;

const TimelineWrapper = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  position: relative;
  max-width: 800px;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  display: flex;
  justify-content: flex-end;
  padding-right: 50%;
  margin-bottom: 2rem;
  position: relative;

  &:nth-child(even) {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: 50%;
  }

  @media (max-width: 768px) {
    justify-content: flex-start !important;
    padding-left: 80px !important;
    padding-right: 0 !important;
  }
`;

const TimelineContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.card};
  max-width: 400px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    transform: translateY(-50%);
  }

  ${TimelineItem}:nth-child(even) &::before {
    right: -10px;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent ${({ theme }) => theme.colors.surface};
  }

  ${TimelineItem}:not(:nth-child(even)) &::before {
    left: -10px;
    border-width: 10px 10px 10px 0;
    border-color: transparent ${({ theme }) => theme.colors.surface} transparent transparent;
  }

  @media (max-width: 768px) {
    &::before {
      left: -10px !important;
      border-width: 10px 10px 10px 0 !important;
      border-color: transparent ${({ theme }) => theme.colors.surface} transparent transparent !important;
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);

  @media (max-width: 768px) {
    left: 30px;
  }
`;

const TimelineYear = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const TimelineTitle = styled.h4`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const TimelineDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const Timeline = () => {
  const timelineData = [
    {
      year: '2020',
      title: 'Started Learning Programming',
      description: 'Began my journey with HTML, CSS, and JavaScript. Built my first static websites and learned the basics of web development.'
    },
    {
      year: '2021',
      title: 'Discovered React',
      description: 'Fell in love with React and its component-based architecture. Started building interactive web applications and learning modern JavaScript.'
    },
    {
      year: '2022',
      title: 'Full-Stack Development',
      description: 'Expanded my skills to include Node.js, Express, and databases. Built complete web applications with both frontend and backend.'
    },
    {
      year: '2023',
      title: 'Advanced Technologies',
      description: 'Dived into TypeScript, Next.js, and cloud technologies. Started contributing to open-source projects and building complex applications.'
    },
    {
      year: '2024',
      title: 'Professional Growth',
      description: 'Focused on best practices, performance optimization, and UI/UX design. Working on real-world projects and expanding my portfolio.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <TimelineContainer id="timeline">
      <Title
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Learning Journey
      </Title>
      <TimelineWrapper
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {timelineData.map((item, index) => (
          <TimelineItem key={index} variants={itemVariants}>
            <TimelineContent>
              <TimelineYear>{item.year}</TimelineYear>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineDescription>{item.description}</TimelineDescription>
            </TimelineContent>
            <TimelineDot />
          </TimelineItem>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

export default Timeline;