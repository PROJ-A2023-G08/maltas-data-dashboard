import axios, { AxiosResponse } from 'axios';
import { RegisterBasics } from '@/layouts/RegisterForm';
import { LoginBasic } from '@/layouts/LoginForm';

const API_BASE_URL = 'http://localhost:5000';// we are going to change this base on host in future

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (
  credentials: LoginBasic
): Promise<AxiosResponse<AuthResponse>> => {
  return api.post('/api/auth/login', credentials);
};

export const register = async (
  userData: RegisterBasics
): Promise<AxiosResponse<AuthResponse>> => {
  return api.post('/api/auth/register', userData);
};
