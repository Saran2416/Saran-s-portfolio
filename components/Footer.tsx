import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../app/theme';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem 1rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2024 S.Saran. All rights reserved. Built with Next.js & Styled Components.</FooterText>
      <SocialLinks>
        <SocialLink
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title="GitHub"
        >
          💻
        </SocialLink>
        <SocialLink
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title="LinkedIn"
        >
          🔗
        </SocialLink>
        <SocialLink
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title="Twitter"
        >
          𝕏
        </SocialLink>
        <SocialLink
          href="mailto:alex@example.com"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title="Email"
        >
          ✉️
        </SocialLink>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer;