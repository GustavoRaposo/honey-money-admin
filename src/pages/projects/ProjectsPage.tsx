import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Layout } from '../../components/layout/Layout';
import { Header } from '../../components/layout/Header';
import { Container, Button } from '../../styles';
import { Loading } from '../../components/common/Loading';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import { apiService } from '../../services/api';
import { Project, CreateProjectRequest } from '../../types/project';

import { ProjectsList } from '../../components/project/ProjectsList';
import { CreateProjectModal } from '../../components/project/CreateProjectModal';
import { DeleteProjectModal } from '../../components/project/DeleteProjectModal';
import { EmptyState } from '../../components/EmptyState';
import { SuccessMessage } from '../../components/SuccessMessage';

export const ProjectsPage: React.FC = () => {
  const { userId } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const formProps = useForm<CreateProjectRequest>({
    initialValues: { name: '', company: '' },
    onSubmit: async (formValues) => { await handleCreateProject(formValues); },
    validate: (formValues) => {
      const errors: Partial<Record<keyof CreateProjectRequest, string>> = {};
      if (!formValues.name.trim()) errors.name = 'Nome é obrigatório';
      if (!formValues.company.trim()) errors.company = 'Empresa é obrigatória';
      return errors;
    },
  });

  const { values, errors, isSubmitting, handleChange, handleSubmit } = formProps;

  const fetchProjects = async () => {
    if (!userId) return;
    setLoading(true);
    setSuccessMessage('');
    try {
      const data = await apiService.getUserProjects(userId);
      setProjects(data);
    } catch (error) {
      toast.error('Erro ao carregar projetos');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, [userId]);

  const handleCreateProject = async (formValues: CreateProjectRequest) => {
    try {
      await apiService.createProject(formValues);
      setShowModal(false);
      setSuccessMessage('Projeto criado com sucesso!');
      toast.success('Projeto criado com sucesso!');
      formProps.values.name = '';
      formProps.values.company = '';
      await fetchProjects();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      toast.error('Erro ao criar projeto');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    formProps.values.name = '';
    formProps.values.company = '';
    formProps.clearErrors();
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await apiService.deleteProject(projectToDelete.id);
      setShowDeleteModal(false);
      setProjectToDelete(null);
      setSuccessMessage('Projeto deletado com sucesso!');
      toast.success('Projeto deletado com sucesso!');
      await fetchProjects();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      toast.error('Erro ao deletar projeto');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Layout activeMenuItem="projects">
      <Header />
      <div style={{ padding: '32px 0' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>Meus Projetos</h2>
            <Button style={{ backgroundColor: '#ffa500', color: '#121212', fontWeight: 600 }}
              onClick={() => setShowModal(true)}>
              Criar novo projeto
            </Button>
          </div>
          {successMessage && <SuccessMessage message={successMessage} />}
          {loading ? (
            <Loading text="Carregando projetos..." />
          ) : projects.length === 0 ? (
            <div style={{ background: '#232323', borderRadius: 12 }}>
              <EmptyState
                title="Nenhum projeto encontrado"
                text='Você ainda não possui projetos. Clique no botão "Criar novo projeto" para começar a organizar seus trabalhos.'
              >
                <Button style={{ backgroundColor: '#ffa500', color: '#121212', fontWeight: 600, marginTop: 16 }}
                  onClick={() => setShowModal(true)}>
                  Criar meu primeiro projeto
                </Button>
              </EmptyState>
            </div>
          ) : (
            <ProjectsList
              projects={projects}
              onDeleteClick={handleDeleteClick}
              isDeleting={isDeleting}
            />
          )}
        </Container>
      </div>
      <CreateProjectModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        errors={errors}
        values={values}
        onChange={handleChange}
      />
      <DeleteProjectModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        project={projectToDelete}
      />
    </Layout>
  );
};