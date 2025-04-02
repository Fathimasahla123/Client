import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/customer/me');
        setCustomer(response.data);
      } catch (error) {
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (formData) => {
    try {
      const response = await api.post('/customer/login', formData);
      localStorage.setItem('token', response.data.token);
      setCustomer(response.data.customer);
      
      if (response.data.customer.isFirstLogin) {
        navigate('/change-password');
      } else {
        navigate('/dashboard');
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (formData) => {
    try {
      const response = await api.post('/customer/change-password', formData);
      setCustomer(prev => ({ ...prev, isFirstLogin: false }));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (formData) => {
    try {
      const response = await api.put('/customer/profile', formData);
      setCustomer(response.data.customer);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const uploadProfileImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/customer/upload-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setCustomer(prev => ({
        ...prev,
        profileImageUrl: response.data.profileImageUrl
      }));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/customer/logout');
      localStorage.removeItem('token');
      setCustomer(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <CustomerContext.Provider value={{ 
      customer, 
      loading, 
      login, 
      changePassword,
      updateProfile,
      uploadProfileImage,
      logout
    }}>
      {!loading && children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);