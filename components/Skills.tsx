'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../app/theme';

const SkillsContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, rgba(26, 26, 46, 0.5) 100%);
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

const SkillsGrid = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const SkillCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillIcon = styled.span`
  font-size: 2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: 4px;
`;

const SkillLevel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Skills = () => {
  const skills = [
    { name: 'JavaScript', level: 85, icon: '🟨' },
    { name: 'React', level: 80, icon: '⚛️' },
    { name: 'TypeScript', level: 75, icon: '🔷' },
    { name: 'Node.js', level: 70, icon: '🟢' },
    { name: 'Python', level: 65, icon: '🐍' },
    { name: 'CSS/SCSS', level: 90, icon: '🎨' },
    { name: 'HTML', level: 95, icon: '🏗️' },
    { name: 'Git', level: 80, icon: '📚' },
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
    <SkillsContainer id="skills">
      <Title
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        My Skills
      </Title>
      <SkillsGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill, index) => (
          <SkillCard key={index} variants={cardVariants}>
            <SkillTitle>
              <SkillIcon>{skill.icon}</SkillIcon>
              {skill.name}
            </SkillTitle>
            <ProgressBar>
              <ProgressFill
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </ProgressBar>
            <SkillLevel>{skill.level}% Proficiency</SkillLevel>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsContainer>
  );
};

export default Skills;