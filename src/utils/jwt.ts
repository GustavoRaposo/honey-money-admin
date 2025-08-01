// Função para decodificar JWT sem verificação (apenas para extrair payload)
export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
};

// Interface para o payload do JWT
export interface JWTPayload {
  sub: string;
  id: string;
  name: string;
  email: string;
  city: string;
  estate: string;
  country: string;
  birthDate: string;
  registeredWhen: string;
  updatedWhen: string;
  iat: number;
  exp: number;
}
