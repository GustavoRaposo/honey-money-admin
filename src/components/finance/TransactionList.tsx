import React from 'react';
import styled from 'styled-components';
import { Transaction } from '../../types/finance';
import { EmptyState } from '../EmptyState';

const TransactionListContainer = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: 24px;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #333333;

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionDescription = styled.h4`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const TransactionDetails = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #888888;
`;

const TransactionAmount = styled.div<{ type: 'income' | 'expense' }>`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.type === 'income' ? '#4CAF50' : '#F44336'};
`;

const TransactionDate = styled.div`
  font-size: 12px;
  color: #666666;
`;

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  loading = false
}) => {
  if (loading) {
    return (
      <TransactionListContainer>
        <div style={{ textAlign: 'center', padding: '40px', color: '#888888' }}>
          Carregando transações...
        </div>
      </TransactionListContainer>
    );
  }

  if (transactions.length === 0) {
    return (
      <TransactionListContainer>
        <EmptyState
          title="Nenhuma transação encontrada"
          text="Adicione sua primeira receita ou gasto para começar."
        />
      </TransactionListContainer>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <TransactionListContainer>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id}>
          <TransactionInfo>
            <TransactionDescription>
              {transaction.description}
            </TransactionDescription>
            <TransactionDetails>
              <span>{transaction.category}</span>
              <TransactionDate>
                {formatDate(transaction.date)}
              </TransactionDate>
            </TransactionDetails>
          </TransactionInfo>
          <TransactionAmount type={transaction.type}>
            {transaction.type === 'income' ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </TransactionAmount>
        </TransactionItem>
      ))}
    </TransactionListContainer>
  );
};
