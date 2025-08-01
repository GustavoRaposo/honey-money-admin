import React from 'react';
import styled from 'styled-components';
import { TransactionSummary } from '../../types/finance';

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const SummaryCard = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

const SummaryTitle = styled.h3`
  color: #888888;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SummaryValue = styled.div<{ type?: 'income' | 'expense' | 'balance' }>`
  font-size: 28px;
  font-weight: 700;
  color: ${props => {
    if (props.type === 'income') return '#4CAF50';
    if (props.type === 'expense') return '#F44336';
    if (props.type === 'balance') return props.children?.toString().includes('-') ? '#F44336' : '#4CAF50';
    return '#ffffff';
  }};
`;

interface FinancialSummaryProps {
  summary: TransactionSummary;
  loading?: boolean;
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  summary,
  loading = false
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  if (loading) {
    return (
      <SummaryContainer>
        {[1, 2, 3, 4].map(i => (
          <SummaryCard key={i}>
            <SummaryTitle>Carregando...</SummaryTitle>
            <SummaryValue>--</SummaryValue>
          </SummaryCard>
        ))}
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <SummaryCard>
        <SummaryTitle>Total de Receitas</SummaryTitle>
        <SummaryValue type="income">
          {formatCurrency(summary.totalIncome)}
        </SummaryValue>
      </SummaryCard>

      <SummaryCard>
        <SummaryTitle>Total de Gastos</SummaryTitle>
        <SummaryValue type="expense">
          {formatCurrency(summary.totalExpenses)}
        </SummaryValue>
      </SummaryCard>

      <SummaryCard>
        <SummaryTitle>Saldo</SummaryTitle>
        <SummaryValue type="balance">
          {formatCurrency(summary.balance)}
        </SummaryValue>
      </SummaryCard>

      <SummaryCard>
        <SummaryTitle>Transações</SummaryTitle>
        <SummaryValue>
          {summary.transactionCount}
        </SummaryValue>
      </SummaryCard>
    </SummaryContainer>
  );
};
