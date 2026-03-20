'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../app/theme';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  width: 100%;
  backdrop-filter: blur(20px);
  background: rgba(10, 10, 10, 0.8);
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo
        onClick={() => scrollToSection('hero')}
        whileHover={{ scale: 1.05 }}
      >
        Portfolio
      </Logo>
      <Nav>
        <NavLink onClick={() => scrollToSection('hero')}>Home</NavLink>
        <NavLink onClick={() => scrollToSection('about')}>About</NavLink>
        <NavLink onClick={() => scrollToSection('skills')}>Skills</NavLink>
        <NavLink onClick={() => scrollToSection('projects')}>Projects</NavLink>
        <NavLink onClick={() => scrollToSection('timeline')}>Timeline</NavLink>
        <NavLink onClick={() => scrollToSection('achievements')}>Achievements</NavLink>
        <NavLink onClick={() => scrollToSection('contact')}>Contact</NavLink>
      </Nav>
      <MobileMenuButton>
        <i className="fas fa-bars"></i>
      </MobileMenuButton>
    </HeaderContainer>
  );
};

export default Header;