import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styles';

interface CalendarActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: () => void;
  onCreateEvent: () => void;
  selectedDate: Date | null;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  border: 1px solid #333;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const ModalHeader = styled.div`
  margin-bottom: 24px;
`;

const ModalTitle = styled.h3`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ModalSubtitle = styled.p`
  color: #b3b3b3;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const ActionButton = styled(Button)`
  justify-content: flex-start;
  text-align: left;
  padding: 16px 20px;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CalendarActionModal: React.FC<CalendarActionModalProps> = ({
  isOpen,
  onClose,
  onCreateTask,
  onCreateEvent,
  selectedDate
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>O que você gostaria de criar?</ModalTitle>
          <ModalSubtitle>
            {formatDate(selectedDate)}
          </ModalSubtitle>
        </ModalHeader>

        <ButtonGroup>
          <ActionButton onClick={onCreateTask}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>📝 Criar Tarefa</div>
              <div style={{ fontSize: 12, color: '#000000ff' }}>
                Adicione uma tarefa para ser concluída
              </div>
            </div>
          </ActionButton>

          <ActionButton onClick={onCreateEvent}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>📅 Criar Evento</div>
              <div style={{ fontSize: 12, color: '#000000ff' }}>
                Agende um compromisso com horário específico
              </div>
            </div>
          </ActionButton>
        </ButtonGroup>

        <CloseButtonContainer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </CloseButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};