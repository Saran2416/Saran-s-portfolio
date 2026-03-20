'use client';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import LoadingScreen from '../components/LoadingScreen';
import ParallaxBackground from '../components/ParallaxBackground';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
    color: #ffffff;
    overflow-x: hidden;
    min-height: 100vh;
    cursor: none;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #0a0a0a;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #00d4ff, #090979);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #00d4ff, #090979, #ff00ff);
  }
`;

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ParallaxBackground />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default LayoutProvider;
