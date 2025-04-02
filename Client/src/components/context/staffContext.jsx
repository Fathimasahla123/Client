import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/staff/me');
        setStaff(response.data);
      } catch (error) {
        setStaff(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (formData) => {
    try {
      const response = await api.post('/staff/login', formData);
      localStorage.setItem('token', response.data.token);
      setStaff(response.data.staff);
      navigate('/staff/dashboard');
      return response;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/staff/logout');
      localStorage.removeItem('token');
      setStaff(null);
      navigate('/staff/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <StaffContext.Provider value={{ staff, loading, login, logout }}>
      {!loading && children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => useContext(StaffContext);