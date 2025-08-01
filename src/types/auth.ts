export interface User {
  id: string;
  email: string;
  name: string;
  city: string;
  estate: string;
  country: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  senha: string; // Changed from 'password' to 'senha' to match API
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  estate: string;
  country: string;
  birthDate: string;
}

// Updated to match the new API response format
export interface AuthResponse {
  access_token: string;
  expires_in: number;
}

// Error response from API
export interface AuthError {
  message: string;
  error: string;
  statusCode: number;
}

export interface ApiError {
  message: string;
  status: number;
}
