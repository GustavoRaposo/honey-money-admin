export const API_ENDPOINTS = {
  AUTH: '/auth',
  USER: '/user',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'honey_money_token',
  USER_ID: 'honey_money_user_id',
  USER_NAME: 'honey_money_user_name',
  USER: 'honey_money_user',
} as const;
