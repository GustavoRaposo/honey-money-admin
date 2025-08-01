import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout } from '../../components/layout/Layout';
import { Header } from '../../components/layout/Header';
import { AddTransactionModal } from '../../components/finance/AddTransactionModal';
import { TransactionList } from '../../components/finance/TransactionList';
import { FinancialSummary } from '../../components/finance/FinancialSummary';
import { Button } from '../../styles';
import { Transaction, CreateTransactionRequest, TransactionSummary } from '../../types/finance';
import { apiService } from '../../services/api';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
`;

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '+';
    font-size: 20px;
    font-weight: bold;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #444444;
  border-radius: 6px;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #ffd700;
  }

  option {
    background-color: #1a1a1a;
    color: #ffffff;
  }
`;

export const FinancePage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    transactionCount: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');

  useEffect(() => {
    loadTransactions();
    loadSummary();
  }, [typeFilter]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const filters = typeFilter !== 'all' ? { type: typeFilter } : {};
      const data = await apiService.getTransactions(filters);
      setTransactions(data);
    } catch (error) {
      toast.error('Erro ao carregar transações');
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    try {
      const data = await apiService.getTransactionSummary();
      setSummary(data);
    } catch (error) {
      toast.error('Erro ao carregar resumo financeiro');
      console.error('Error loading summary:', error);
    }
  };

  const handleAddTransaction = async (data: CreateTransactionRequest) => {
    try {
      await apiService.createTransaction(data);
      toast.success(
        `${data.type === 'income' ? 'Receita' : 'Gasto'} adicionado com sucesso!`
      );
      loadTransactions();
      loadSummary();
    } catch (error) {
      toast.error('Erro ao adicionar transação');
      console.error('Error creating transaction:', error);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (typeFilter === 'all') return true;
    return transaction.type === typeFilter;
  });

  return (
    <Layout activeMenuItem="finance">
      <Header />
      <PageContainer>
        <PageHeader>
          <PageTitle>Finanças</PageTitle>
          <AddButton onClick={() => setIsModalOpen(true)}>
            Nova Transação
          </AddButton>
        </PageHeader>

        <FinancialSummary summary={summary} loading={loading} />

        <FiltersContainer>
          <FilterSelect
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | 'income' | 'expense')}
          >
            <option value="all">Todas as transações</option>
            <option value="income">Apenas receitas</option>
            <option value="expense">Apenas gastos</option>
          </FilterSelect>
        </FiltersContainer>

        <TransactionList 
          transactions={filteredTransactions} 
          loading={loading} 
        />

        <AddTransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTransaction}
        />
      </PageContainer>
    </Layout>
  );
};
