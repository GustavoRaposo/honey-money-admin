import React from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoginForm } from '../../components/auth/LoginForm';
import { Card } from '../../styles';
import { Loading } from '../../components/common/Loading';
import { ReactComponent as LogoIcon } from '../../assets/bee.svg';

const AuthPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #121212 0%, #1e1e1e 100%);
  padding: 24px;
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #ffa500;
  margin-bottom: 32px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #b3b3b3;
  text-align: center;
  margin-bottom: 32px;
  font-size: 16px;
`;

export const AuthPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <AuthPageContainer>
        <Loading text="Carregando..." />
      </AuthPageContainer>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthPageContainer>
      <AuthCard>
        <LogoIcon width={100} height={100} />
        <Logo>HONEY MONEY</Logo>
        <Subtitle>
          Faça login para acessar o painel administrativo
        </Subtitle>
        <LoginForm />
      </AuthCard>
    </AuthPageContainer>
  );
};
