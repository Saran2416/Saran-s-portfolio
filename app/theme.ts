import 'styled-components';

export interface Theme {
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    main: string;
    heading: string;
  };
  shadows: {
    glow: string;
    card: string;
  };
  gradients: {
    hero: string;
    button: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const theme: Theme = {
  colors: {
    background: '#0a0a0a',
    surface: 'rgba(255, 255, 255, 0.05)',
    primary: '#00d4ff',
    secondary: '#ff00ff',
    accent: '#00ffcc',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
  },
  fonts: {
    main: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
  },
  shadows: {
    glow: '0 0 20px rgba(0, 212, 255, 0.3)',
    card: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    button: 'linear-gradient(45deg, #00d4ff, #ff00ff)',
  },
};
