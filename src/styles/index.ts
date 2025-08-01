import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #121212;
    color: #ffffff;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  input, button, textarea, select {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const theme = {
  colors: {
    primary: '#ffa500',
    primaryDark: '#e6940a',
    secondary: '#1e1e1e',
    background: '#121212',
    surface: '#1e1e1e',
    error: '#f44336',
    success: '#4caf50',
    warning: '#ff9800',
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      disabled: '#666666',
    },
    border: '#333333',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
};

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Card = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #333333;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 16px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  transition: all 0.2s ease;
  min-height: 44px;
  cursor: pointer;

  ${props => {
    if (props.variant === 'secondary') {
      return `
        background-color: #1e1e1e;
        color: #ffffff;
        border: 1px solid #333333;

        &:hover:not(:disabled) {
          background-color: #333333;
        }
      `;
    } else if (props.variant === 'outline') {
      return `
        background-color: transparent;
        color: #ffa500;
        border: 1px solid #ffa500;

        &:hover:not(:disabled) {
          background-color: #ffa500;
          color: #000000;
        }
      `;
    } else {
      return `
        background-color: #ffa500;
        color: #000000;

        &:hover:not(:disabled) {
          background-color: #e6940a;
        }
      `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #333333;
  border-radius: 8px;
  background-color: #1e1e1e;
  color: #ffffff;
  font-size: 14px;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #ffa500;
    box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.2);
  }

  &::placeholder {
    color: #b3b3b3;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #ffffff;
  font-size: 14px;
`;

export const ErrorMessage = styled.span`
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;
