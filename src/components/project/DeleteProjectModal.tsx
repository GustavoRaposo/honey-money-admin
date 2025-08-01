import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styles';
import { Project } from '../../types/project';

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

const DeleteModalContent = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 24px;
  text-align: center;
  background: #232323;
  border-radius: 12px;
  padding: 32px;
`;

const DeleteModalIcon = styled.div`
  width: 64px;
  height: 64px;
  background-color: rgba(220, 53, 69, 0.1);
  border: 2px solid #dc3545;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
`;

const TrashIcon = styled.svg`
  width: 32px;
  height: 32px;
  fill: currentColor;
`;

const DeleteModalTitle = styled.h3`
  color: #ffff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const DeleteModalText = styled.p`
  color: #b3b3b3;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const DeleteModalProjectName = styled.span`
  color: #ffa500;
  font-weight: 600;
`;

const DeleteButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
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

const ConfirmDeleteButton = styled(Button)`
  background-color: #dc3545;
  color: #ffff;
  font-weight: 600;

  &:hover {
    background-color: #c82333;
  }

  &:disabled {
    background-color: #666;
    color: #999;
    cursor: not-allowed;
  }
`;

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  project: Project | null;
}

export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen, onClose, onConfirm, isDeleting, project
}) => (
  <ModalOverlay isOpen={isOpen}>
    <DeleteModalContent>
      <DeleteModalIcon>
        <TrashIcon viewBox="0 0 24 24">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none" />
        </TrashIcon>
      </DeleteModalIcon>
      <DeleteModalTitle>Deletar Projeto</DeleteModalTitle>
      <DeleteModalText>
        Tem certeza que deseja deletar o projeto{' '}
        <DeleteModalProjectName>
          "{project?.name}"
        </DeleteModalProjectName>
        ?<br /><br />
        Esta ação não pode ser desfeita.
      </DeleteModalText>
      <DeleteButtonGroup>
        <CancelButton type="button" onClick={onClose}>Cancelar</CancelButton>
        <ConfirmDeleteButton
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deletando...' : 'Sim, deletar'}
        </ConfirmDeleteButton>
      </DeleteButtonGroup>
    </DeleteModalContent>
  </ModalOverlay>
);