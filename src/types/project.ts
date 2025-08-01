export interface ProjectCreator {
  name: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  company: string;
  createDate: string;
  creator: ProjectCreator;
}

export interface CreateProjectRequest {
  name: string;
  company: string;
}

export interface CreateProjectResponse {
  id: number;
  name: string;
  company: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}