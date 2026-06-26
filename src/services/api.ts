import axios from 'axios';

// Base URL for backend. Change if your backend runs on a different port/host.
const API_BASE_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Student {
  _id: string;
  name: string;
  email: string;
  mobileNo: number;
  gender: 'Male' | 'Female';
  profileImage: string; // stored filename
  createdAt: string;
  updatedAt: string;
}

// Function to construct absolute path for student avatar images
export const getImageUrl = (filename: string): string => {
  if (!filename) return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
  return `${API_BASE_URL}/uploads/${filename}`;
};

export const studentAPI = {
  getAll: async () => {
    const response = await api.get<{ message: string; data: Student[] }>('/student/all');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ message: string; data: Student }>(`/student/${id}`);
    return response.data;
  },

  create: async (formData: FormData) => {
    const response = await api.post<{ message: string; data: Student }>('/student/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: string, formData: FormData) => {
    const response = await api.put<{ message: string; data: Student }>(`/student/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ message: string; data: Student }>(`/student/${id}`);
    return response.data;
  },
};
