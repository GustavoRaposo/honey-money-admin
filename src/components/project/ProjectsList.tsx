import React from 'react';
import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';

interface ProjectsListProps {
  projects: Project[];
  onDeleteClick: (project: Project) => void;
  isDeleting: boolean;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects, onDeleteClick, isDeleting }) => (
  <div style={{ display: 'grid', gap: 16 }}>
    {projects.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        onDeleteClick={onDeleteClick}
        isDeleting={isDeleting}
      />
    ))}
  </div>
);