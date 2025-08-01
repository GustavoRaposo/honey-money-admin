import React from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #121212;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-x: hidden;

  @media (min-width: 768px) {
    margin-left: 0;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
  activeMenuItem?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeMenuItem }) => {
  return (
    <LayoutContainer>
      <Sidebar activeItem={activeMenuItem} />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};