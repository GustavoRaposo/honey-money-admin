import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #333333;
  border-top: 4px solid #ffa500;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-left: 16px;
  color: #b3b3b3;
`;

interface LoadingProps {
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ text = 'Carregando...' }) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};
