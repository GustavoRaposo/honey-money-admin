import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Button } from '../../styles';

const HeaderContainer = styled.header`
  background-color: #1e1e1e;
  border-bottom: 1px solid #333333;
  padding: 24px 0;
  position: sticky;
  top: 0;
  height: 90px;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 40px;
`;

const UserName = styled.span`
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const LogoutButtonWrapper = styled.div`
  position: absolute;
  right: 0;
`;

interface HeaderProps {
  title?: string;
  showUserInfo?: boolean;
  showLogout?: boolean;
  onLogout?: () => void;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = "HONEY MONEY",
  showUserInfo = true,
  showLogout = true,
  onLogout,
  children
}) => {
  const { logout, userName } = useAuth();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
    }
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          {showUserInfo && (
            <>
              <UserName>Olá, {userName || 'Usuário'}!</UserName>
              {showLogout && (
                <LogoutButtonWrapper>
                  <Button variant="outline" onClick={handleLogout}>
                    Sair
                  </Button>
                </LogoutButtonWrapper>
              )}
            </>
          )}
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};