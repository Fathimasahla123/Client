import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};