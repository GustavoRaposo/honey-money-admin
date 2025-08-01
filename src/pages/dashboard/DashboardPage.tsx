import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../components/layout/Layout';
import { Header } from '../../components/layout/Header';
import { Container, Card } from '../../styles';

const DashboardContent = styled.div`
  padding: 32px 0;
`;

const WelcomeCard = styled(Card)`
  text-align: center;
  margin-bottom: 32px;
`;

const WelcomeTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 16px;
  font-size: 28px;
`;

const WelcomeText = styled.p`
  color: #b3b3b3;
  font-size: 16px;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled(Card)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #ffa500;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  color: #b3b3b3;
  font-size: 14px;
`;

export const DashboardPage: React.FC = () => {
  return (
    <Layout activeMenuItem="dashboard">
      <Header />
      <DashboardContent>
        <Container>
          <WelcomeCard>
            <WelcomeTitle>Bem-vindo ao HONEY MONEY</WelcomeTitle>
            <WelcomeText>
              Seu painel administrativo está pronto. Aqui você pode gerenciar todos os aspectos 
              do seu sistema de forma eficiente e segura.
            </WelcomeText>
          </WelcomeCard>

          <StatsGrid>
            <StatCard>
              <StatNumber>0</StatNumber>
              <StatLabel>Usuários Ativos</StatLabel>
            </StatCard>

            <StatCard>
              <StatNumber>0</StatNumber>
              <StatLabel>Projetos</StatLabel>
            </StatCard>

            <StatCard>
              <StatNumber>0</StatNumber>
              <StatLabel>Relatórios</StatLabel>
            </StatCard>

            <StatCard>
              <StatNumber>100%</StatNumber>
              <StatLabel>Sistema Online</StatLabel>
            </StatCard>
          </StatsGrid>
        </Container>
      </DashboardContent>
    </Layout>
  );
};