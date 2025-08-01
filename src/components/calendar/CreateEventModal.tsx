import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Label, FormGroup, ErrorMessage } from '../../styles';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: EventFormData) => void;
  selectedDate: Date | null;
}

interface EventFormData {
  title: string;
  time: string;
  description: string;
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
  max-width: 500px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #1e1e1e;
  color: #fff;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #ffa500;
    box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.2);
  }

  &::placeholder {
    color: #b3b3b3;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    time: '',
    description: ''
  });
  const [errors, setErrors] = useState<Partial<EventFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EventFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.time.trim()) {
      newErrors.time = 'Horário é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ title: '', time: '', description: '' });
      setErrors({});
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ title: '', time: '', description: '' });
    setErrors({});
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>📅 Criar Novo Evento</ModalTitle>
          <ModalSubtitle>
            {formatDate(selectedDate)}
          </ModalSubtitle>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="event-title">Título do Evento</Label>
            <Input
              id="event-title"
              type="text"
              placeholder="Digite o título do evento"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="event-time">Horário</Label>
            <Input
              id="event-time"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
            />
            {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="event-description">Descrição (opcional)</Label>
            <TextArea
              id="event-description"
              placeholder="Adicione detalhes sobre o evento"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </FormGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Criando...' : 'Criar Evento'}
            </Button>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};