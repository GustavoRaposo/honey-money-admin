import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import { Project, CreateProjectRequest, CreateProjectResponse } from '../types/project';
import { STORAGE_KEYS } from '../constants';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor para adicionar token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor para tratar erros
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Método para login - POST /auth/login com body { email, senha }
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login', {
      email: credentials.email,
      password: credentials.senha,
    });
    return response.data;
  }

  // Método para registro - POST /auth/register
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/register', userData);
    return response.data;
  }

  // Método para buscar projetos do usuário - GET /user-projects/user/:userId
  async getUserProjects(userId: string): Promise<Project[]> {
    const response: AxiosResponse<Project[]> = await this.api.get(`/user-projects/user/${userId}`);
    return response.data;
  }

  // Método para criar projeto - POST /projects
  async createProject(projectData: CreateProjectRequest): Promise<CreateProjectResponse> {
    const response: AxiosResponse<CreateProjectResponse> = await this.api.post('/projects', projectData);
    return response.data;
  }

  // Método para deletar projeto - DELETE /projects/:id
  async deleteProject(projectId: number): Promise<void> {
    await this.api.delete(`/projects/${projectId}`);
  }
}

export const apiService = new ApiService();