import { LoginBasic } from '@maltas-dashboard/frontend/src/layouts/LoginForm';
import { RegisterBasics } from '@maltas-dashboard/frontend/src/layouts/RegisterForm';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AdminDeleteUserResult, AdminGetAllUsersResult, AdminGetSingleUserResult, UpdatePasswordResult, UpdateUserRoleResult, UploadProfileImageResult, User } from '../types';
import { AdminDeleteUserQueryParams, AdminGetSingleUserQueryParams, AdminUpdateUserRoleQueryParams, GetMeasurement, UpdatePasswordQueryParams, UpdateUserQueryParams, UploadProfileImageQueryParams } from '../types/queryTypes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

const api = axios.create({
  baseURL: API_BASE_URL,
});

interface ApiConfig {
  baseURL: string;
  headers: Record<string, string>;
}

interface RequestOptions<T> {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  url: string;
  data?: any;
  config?: Record<string, any>;
}


const createApiWithToken = (token?: string): AxiosInstance => {
  const config: ApiConfig = {
    baseURL: API_BASE_URL || '',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return axios.create(config);
};



const makeRequest = async <T>(
  api: AxiosInstance,
  { method, url, data, config }: RequestOptions<T>
): Promise<T| any> => {
  try {
    const response: AxiosResponse<T> = await api({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    // console.error('Request error:', error);
  }
};


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


export const getUserProfile = async (token: string): Promise<User> =>{
   return  makeRequest<User>(createApiWithToken(token), { method: 'get', url: '/api/users/profile', data: {} });
}

export const updatePassword = async (token:string, data: UpdatePasswordQueryParams): Promise<AxiosResponse<UpdatePasswordResult>> =>{
  return  makeRequest<UpdatePasswordResult>(createApiWithToken(token), { method: 'post', url: '/api/users/update-password', data });
}

export const uploadProfileImage = async (token: string, data: UploadProfileImageQueryParams): Promise<AxiosResponse<UploadProfileImageResult>> =>{
  return  makeRequest<UploadProfileImageResult>(createApiWithToken(token), { method: 'put', url: '/api/users/update-image', data });
}

export const updateUserProfile = async (token: string, data: UpdateUserQueryParams): Promise<User> =>{
  return  makeRequest<User>(createApiWithToken(token), { method: 'put', url: '/api/users/update-user-info', data });
}

export const updateUserRole = async (token: string, data: AdminUpdateUserRoleQueryParams): Promise<UpdateUserRoleResult> =>{
  return  makeRequest<UpdateUserRoleResult>(createApiWithToken(token), { method: 'put', url: '/api/users/update-user-role', data });
}

export const getSingleUser = async (token: string, data: AdminGetSingleUserQueryParams): Promise<AdminGetSingleUserResult> =>{
  return  makeRequest<AdminGetSingleUserResult>(createApiWithToken(token), { method: 'put', url: `/api/users/singleUser/${data.id}`, data });
}

export const getAllUsers = async (token: string): Promise<AdminGetAllUsersResult> =>{
  return  makeRequest< AdminGetAllUsersResult>(createApiWithToken(token), { method: 'get', url: '/api/users/allUsers', data: {} });
}

export const deleteUser = async (token: string, data: AdminDeleteUserQueryParams): Promise<AxiosResponse<AdminDeleteUserResult>> =>{
  return  makeRequest<AdminDeleteUserResult>(createApiWithToken(token), { method: 'put', url: `/api/users/singleUser/${data.id}`, data });
}

export const getCSVData = async (token: string): Promise<GetMeasurement> =>{
  return  makeRequest<GetMeasurement>(createApiWithToken(token), { method: 'get', url: '/api/data/csv-data', data: {} });
}


