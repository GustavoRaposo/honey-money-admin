import React from 'react';
import styled from 'styled-components';
import { FormGroup, Label, Input, ErrorMessage, Button } from '../../styles';
import { useForm } from '../../hooks/useForm';
import { CreateTransactionRequest } from '../../types/finance';
import { validateForm, validators } from '../../utils/validation';

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 24px;
  background: #232323;
  border-radius: 12px;
  padding: 32px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const ModalTitle = styled.h3`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #cccccc;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #444444;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #ffd700;
  }

  option {
    background-color: #1a1a1a;
    color: #ffffff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #444444;
  color: #ffffff;

  &:hover {
    background-color: #444444;
  }
`;

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTransactionRequest) => Promise<void>;
}

const CATEGORIES = {
  income: [
    'Salário',
    'Freelance',
    'Investimentos',
    'Vendas',
    'Outros'
  ],
  expense: [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Entretenimento',
    'Compras',
    'Outros'
  ]
};

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const formProps = useForm<CreateTransactionRequest>({
    initialValues: {
      type: 'income',
      amount: 0,
      description: '',
      category: 'Salário',
      date: new Date().toISOString().split('T')[0]
    },
    onSubmit: async (values) => {
      await onSubmit(values);
      onClose();
    },
    validate: (values) => validateForm(values, {
      amount: [validators.required, validators.minValue(0.01)],
      description: [validators.required, validators.minLength(3)],
      category: [validators.required]
    })
  });

  const { values, errors, isSubmitting, handleChange, handleSubmit } = formProps;

  const handleTypeChange = (type: 'income' | 'expense') => {
    handleChange('type', type);
    // Reset category when type changes
    const defaultCategory = CATEGORIES[type][0];
    handleChange('category', defaultCategory);
  };

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            Adicionar {values.type === 'income' ? 'Receita' : 'Gasto'}
          </ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Tipo</Label>
            <Select
              value={values.type}
              onChange={(e) => handleTypeChange(e.target.value as 'income' | 'expense')}
            >
              <option value="income">Receita</option>
              <option value="expense">Gasto</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Valor (R$)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={values.amount}
              onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
              placeholder="0,00"
            />
            {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Descrição</Label>
            <Input
              type="text"
              value={values.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descreva a transação..."
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Categoria</Label>
            <Select
              value={values.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              {CATEGORIES[values.type].map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Data</Label>
            <Input
              type="date"
              value={values.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};
