import React from 'react';
import styled from 'styled-components';

const EmptyStateWrapper = styled.div`
  text-align: center;
  padding: 64px 32px;
  color: #b3b3b3;
`;

const EmptyStateTitle = styled.h3`
  color: #ffff;
  margin-bottom: 16px;
  font-size: 24px;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 32px;
`;

interface EmptyStateProps {
  title: string;
  text: string;
  children?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, text, children }) => (
  <EmptyStateWrapper>
    <EmptyStateTitle>{title}</EmptyStateTitle>
    <EmptyStateText>{text}</EmptyStateText>
    {children}
  </EmptyStateWrapper>
);