import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginRequest } from '../types/auth';
import { apiService } from '../services/api';
import { STORAGE_KEYS } from '../constants';
import { decodeJWT, JWTPayload } from '../utils/jwt';
import { toast } from 'react-toastify';

interface AuthContextData {
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  userName: string | null;
  userId: string | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUserName = localStorage.getItem(STORAGE_KEYS.USER_NAME);
    const storedUserId = localStorage.getItem(STORAGE_KEYS.USER_ID);

    if (storedToken) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
      setUserId(storedUserId);
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiService.login(credentials);

      // Armazenar o token
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.access_token);

      // Decodificar JWT para extrair informações do usuário
      const decodedToken: JWTPayload | null = decodeJWT(response.access_token);

      if (decodedToken) {
        // Armazenar informações do usuário
        localStorage.setItem(STORAGE_KEYS.USER_ID, decodedToken.id);
        localStorage.setItem(STORAGE_KEYS.USER_NAME, decodedToken.name);

        // Atualizar estado
        setUserId(decodedToken.id);
        setUserName(decodedToken.name);
      }

      setIsAuthenticated(true);
      toast.success('Login realizado com sucesso!');

      // Redirecionar para dashboard
      window.location.href = '/dashboard';
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login';
      toast.error(errorMessage);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    // Limpar todos os dados do localStorage
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    localStorage.removeItem(STORAGE_KEYS.USER); // Limpar dados antigos também

    // Resetar estado
    setIsAuthenticated(false);
    setUserName(null);
    setUserId(null);

    toast.info('Logout realizado com sucesso!');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        login,
        logout,
        isAuthenticated,
        userName,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
