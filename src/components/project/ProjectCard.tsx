import React from 'react';
import styled from 'styled-components';
import { Project } from '../../types/project';

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
  background: #232323;
  border-radius: 12px;
`;

const ProjectInfo = styled.div`
  flex: 1;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const ProjectId = styled.span`
  background-color: #ffa500;
  color: #121212;
  font-weight: 600;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
`;

const ProjectName = styled.h3`
  color: #ffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const ProjectDetails = styled.div`
  display: grid;
  gap: 8px;
`;

const ProjectDetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const ProjectDetailLabel = styled.span`
  color: #ffa500;
  font-weight: 600;
  font-size: 14px;
  min-width: 80px;
`;

const ProjectDetailValue = styled.span`
  color: #b3b3b3;
  font-size: 14px;
  line-height: 1.4;
`;

const CreatorInfo = styled.div`
  background-color: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.2);
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

const CreatorTitle = styled.div`
  color: #ffa500;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const CreatorDetails = styled.div`
  display: grid;
  gap: 4px;
`;

const CreatorName = styled.div`
  color: #ffff;
  font-weight: 500;
  font-size: 14px;
`;

const CreatorEmail = styled.div`
  color: #b3b3b3;
  font-size: 13px;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 16px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dc3545;
    color: #ffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TrashIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
`;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface ProjectCardProps {
  project: Project;
  onDeleteClick: (project: Project) => void;
  isDeleting: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDeleteClick, isDeleting }) => (
  <Card>
    <ProjectInfo>
      <ProjectHeader>
        <ProjectId>#{project.id}</ProjectId>
        <ProjectName>{project.name}</ProjectName>
      </ProjectHeader>
      <ProjectDetails>
        <ProjectDetailItem>
          <ProjectDetailLabel>Empresa:</ProjectDetailLabel>
          <ProjectDetailValue>{project.company}</ProjectDetailValue>
        </ProjectDetailItem>
        <ProjectDetailItem>
          <ProjectDetailLabel>Criado em:</ProjectDetailLabel>
          <ProjectDetailValue>{formatDate(project.createDate)}</ProjectDetailValue>
        </ProjectDetailItem>
      </ProjectDetails>
      <CreatorInfo>
        <CreatorTitle>Informações do Criador</CreatorTitle>
        <CreatorDetails>
          <CreatorName>{project.creator.name}</CreatorName>
          <CreatorEmail>{project.creator.email}</CreatorEmail>
        </CreatorDetails>
      </CreatorInfo>
    </ProjectInfo>
    <ProjectActions>
      <DeleteButton onClick={() => onDeleteClick(project)} disabled={isDeleting}>
        <TrashIcon viewBox="0 0 24 24">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none" />
        </TrashIcon>
        Deletar
      </DeleteButton>
    </ProjectActions>
  </Card>
);