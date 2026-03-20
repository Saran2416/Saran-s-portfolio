'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../../theme';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, rgba(38, 26, 62, 0.5) 100%);
  padding: 2rem;
`;

const AdminHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin: 0;
  background: linear-gradient(45deg, #00d4ff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BackButton = styled.a`
  padding: 0.75rem 1.5rem;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: #00d4ff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.2);
    border-color: #00d4ff;
  }
`;

const MessagesContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
`;

const MessageCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 212, 255, 0.3);
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.1);
  }
`;

const MessageHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: start;
`;

const MessageMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetaLabel = styled.span`
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MetaValue = styled.span`
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
`;

const Timestamp = styled.span`
  font-size: 0.85rem;
  color: #888;
  text-align: right;
`;

const MessageDivider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
`;

const MessageText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin: 1rem 0 0 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #00d4ff;
  font-size: 1.2rem;
`;

const EmptyContainer = styled(motion.div)`
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
`;

const Stats = styled.div`
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #00d4ff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch messages');
      }

      setMessages(Array.isArray(data.data) ? data.data : []);

      if (data.warning) {
        setWarning(data.warning);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <Title>📧 Contact Messages</Title>
        <BackButton href="/">← Back to Portfolio</BackButton>
      </AdminHeader>

      <Stats style={{ maxWidth: '1400px', margin: '0 auto 2rem auto' }}>
        <StatItem>
          <StatValue>{messages.length}</StatValue>
          <StatLabel>Total Messages</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{new Set(messages.map((m) => m.email)).size}</StatValue>
          <StatLabel>Unique Contacts</StatLabel>
        </StatItem>
      </Stats>

      {loading && (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ⏳ Loading messages...
        </LoadingContainer>
      )}

      {warning && (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ color: '#fbbf24' }}
        >
          ⚠️ {warning}
        </LoadingContainer>
      )}
      {error && (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ color: '#ef4444' }}
        >
          ❌ {error}
        </LoadingContainer>
      )}

      {!loading && !error && messages.length === 0 && (
        <EmptyContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <div>No messages yet. Your contact form submissions will appear here.</div>
        </EmptyContainer>
      )}

      <MessagesContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {messages.map((message, index) => (
          <MessageCard
            key={message._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <MessageHeader>
              <MessageMeta>
                <MetaItem>
                  <MetaLabel>From</MetaLabel>
                  <MetaValue>{message.name}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Email</MetaLabel>
                  <MetaValue>
                    <a href={`mailto:${message.email}`} style={{ color: '#00d4ff', textDecoration: 'none' }}>
                      {message.email}
                    </a>
                  </MetaValue>
                </MetaItem>
              </MessageMeta>
              <Timestamp>{formatDate(message.createdAt)}</Timestamp>
            </MessageHeader>
            <MessageDivider />
            <MessageText>{message.message}</MessageText>
          </MessageCard>
        ))}
      </MessagesContainer>
    </AdminContainer>
  );
}
