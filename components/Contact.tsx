'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../app/theme';

const ContactContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, rgba(38, 26, 62, 0.5) 100%);
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

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled(motion.form).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: #000;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

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
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Alert = styled(motion.div)<{ type: 'error' | 'success' | 'info' }>`
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  background: ${(props) =>
    props.type === 'error'
      ? 'rgba(239, 68, 68, 0.1)'
      : props.type === 'success'
      ? 'rgba(34, 197, 94, 0.1)'
      : 'rgba(59, 130, 246, 0.1)'};
  border: 1px solid ${(props) =>
    props.type === 'error'
      ? 'rgba(239, 68, 68, 0.5)'
      : props.type === 'success'
      ? 'rgba(34, 197, 94, 0.5)'
      : 'rgba(59, 130, 246, 0.5)'};
  color: ${(props) =>
    props.type === 'error'
      ? '#fca5a5'
      : props.type === 'success'
      ? '#86efac'
      : '#93c5fd'};
`;

const ContactInfo = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variants',
})`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const InfoIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const InfoLabel = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const AdminLink = styled.a`
  display: block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.2);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);
    setInfo('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send message');
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      if (data.warning) {
        setInfo(data.warning);
      }

      setFormData({ name: '', email: '', message: '' });

      // Clear success and info messages after 5 seconds
      setTimeout(() => {
        setSuccess(false);
        setInfo('');
      }, 5000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer id="contact">
      <Title
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Get In Touch
      </Title>
      <ContactWrapper>
        <ContactForm
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {error && (
            <Alert
              type="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ❌ {error}
            </Alert>
          )}
          {info && (
            <Alert
              type="info"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🔔 {info}
            </Alert>
          )}
          {success && (
            <Alert
              type="success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✅ Message sent successfully! I'll get back to you soon.
            </Alert>
          )}
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here... (minimum 10 characters)"
              required
            />
          </FormGroup>
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </ContactForm>
        <ContactInfo
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <InfoTitle>Let's Connect</InfoTitle>
          <InfoItem>
            <InfoIcon>📧</InfoIcon>
            <InfoText>
              <InfoLabel>Email</InfoLabel>
              sarithasaran875@gmail.com
            </InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon>📱</InfoIcon>
            <InfoText>
              <InfoLabel>Phone</InfoLabel>
              +91 9150689857
            </InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon>📍</InfoIcon>
            <InfoText>
              <InfoLabel>Location</InfoLabel>
              Coimbatore, Tamil Nadu
            </InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon>💼</InfoIcon>
            <InfoText>
              <InfoLabel>Status</InfoLabel>
              Available for opportunities
            </InfoText>
          </InfoItem>
          <AdminLink href="/admin/messages">View Messages (Admin)</AdminLink>
        </ContactInfo>
      </ContactWrapper>
    </ContactContainer>
  );
};

export default Contact;