import React from 'react';
import styled from 'styled-components';
import { FormGroup, Label, Input, ErrorMessage, Button } from '../../styles';

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
  color: #ffff;
  font-size: 24px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #ffff;
  }
`;

const ModalForm = styled.form`
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #333;
  color: #b3b3b3;

  &:hover {
    background-color: #333;
    color: #ffff;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #ffa500;
  color: #121212;
  font-weight: 600;

  &:hover {
    background-color: #e6940a;
  }

  &:disabled {
    background-color: #666;
    color: #999;
    cursor: not-allowed;
  }
`;

interface CreateProjectModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  errors: Partial<Record<keyof T, string>>;
  values: T;
  onChange: (field: keyof T, value: string) => void;
}

export function CreateProjectModal<T extends Record<string, any>>({
  isOpen, onClose, onSubmit, isSubmitting, errors, values, onChange
}: CreateProjectModalProps<T>) {
  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Criar Novo Projeto</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalForm onSubmit={onSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nome do Projeto</Label>
            <Input
              id="name"
              type="text"
              value={values.name}
              onChange={e => onChange('name', e.target.value)}
              className={errors.name ? 'input-error' : ''}
              placeholder="Digite o nome do projeto"
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              type="text"
              value={values.company}
              onChange={e => onChange('company', e.target.value)}
              className={errors.company ? 'input-error' : ''}
              placeholder="Digite o nome da empresa"
            />
            {errors.company && <ErrorMessage>{errors.company}</ErrorMessage>}
          </FormGroup>
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>Cancelar</CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Criando...' : 'Criar projeto'}
            </SubmitButton>
          </ButtonGroup>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
}