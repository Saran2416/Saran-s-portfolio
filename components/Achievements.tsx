'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../app/theme';

const AchievementsContainer = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.background};
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

const AchievementsGrid = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const AchievementCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.card};
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(0, 212, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: rotate 4s linear infinite;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const AchievementIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const AchievementTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const AchievementDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const Achievements = () => {
  const achievements = [
    {
      icon: '🏆',
      title: 'Hackathon Winner',
      description: 'Won first place in a 24-hour coding challenge, building an innovative solution for local businesses.'
    },
    {
      icon: '📚',
      title: 'Open Source Contributor',
      description: 'Contributed to multiple open-source projects, helping improve documentation and fix bugs.'
    },
    {
      icon: '🎓',
      title: 'Certified Developer',
      description: 'Earned certifications in React, Node.js, and cloud technologies from leading platforms.'
    },
    {
      icon: '🌟',
      title: 'Mentorship Program',
      description: 'Mentored junior developers, helping them learn modern web technologies and best practices.'
    },
    {
      icon: '🚀',
      title: 'Startup Experience',
      description: 'Worked with a tech startup, contributing to the development of a SaaS product used by 1000+ users.'
    },
    {
      icon: '💡',
      title: 'Innovation Award',
      description: 'Recognized for innovative thinking in developing a unique user interface solution.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <AchievementsContainer id="achievements">
      <Title
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Achievements
      </Title>
      <AchievementsGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} variants={cardVariants}>
            <AchievementIcon>{achievement.icon}</AchievementIcon>
            <AchievementTitle>{achievement.title}</AchievementTitle>
            <AchievementDescription>{achievement.description}</AchievementDescription>
          </AchievementCard>
        ))}
      </AchievementsGrid>
    </AchievementsContainer>
  );
};

export default Achievements;