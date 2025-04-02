// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import api from '../services/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       if (token) {
//         try {
//           const decoded = jwt_decode(token);
//           const currentTime = Date.now() / 1000;
          
//           if (decoded.exp < currentTime) {
//             logout();
//             return;
//           }

//           api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
//           // Fetch user data based on role
//           let userData;
//           if (decoded.role === 'Customer') {
//             const response = await api.get(`/users/${decoded.id}`);
//             userData = response.data.user;
//           } else if (decoded.role === 'Staff') {
//             const response = await api.get(`/staff/${decoded.id}`);
//             userData = response.data.staff;
//           } else if (decoded.role === 'Admin') {
//             const response = await api.get(`/users/${decoded.id}`);
//             userData = response.data.user;
//           }

//           setUser({ ...userData, role: decoded.role });
//         } catch (error) {
//           console.error('Error initializing auth:', error);
//           logout();
//         }
//       }
//       setLoading(false);
//     };

//     initializeAuth();
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       const { token, user } = response.data;
      
//       localStorage.setItem('token', token);
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setToken(token);
//       setUser({ ...user, role: user.role });
      
//       return { success: true };
//     } catch (error) {
//       return { success: false, message: error.response?.data?.msg || 'Login failed' };
//     }
//   };

//   const signup = async (name, email, password) => {
//     try {
//       const response = await api.post('/auth/signup', { name, email, password });
      
//       // Automatically log in after signup
//       const loginResponse = await api.post('/auth/login', { email, password });
//       const { token, user } = loginResponse.data;
      
//       localStorage.setItem('token', token);
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setToken(token);
//       setUser({ ...user, role: user.role });
      
//       return { 
//         success: true, 
//         data: response.data,
//         redirectTo: '/menu' // Add redirect path
//       };
//     } catch (error) {
//       return { 
//         success: false, 
//         message: error.response?.data?.msg || 'Signup failed' 
//       };
//     }
//   };

//   const isAuthenticated = () => {
//     return !!user;
//   };

//   const hasRole = (role) => {
//     return user?.role === role;
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         loading,
//         login,
//         signup,
//        // logout,
//         isAuthenticated,
//         hasRole,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import (note camelCase)
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Define logout first so it's available in initializeAuth
  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Use jwtDecode (camelCase) instead of jwt_decode
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            logout(); // Now properly defined
            return;
          }

          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user data based on role
          let userData;
          if (decoded.role === 'Customer') {
            const response = await api.get(`/users/${decoded.id}`);
            userData = response.data.user;
          } else if (decoded.role === 'Staff') {
            const response = await api.get(`/staff/${decoded.id}`);
            userData = response.data.staff;
          } else if (decoded.role === 'Admin') {
            const response = await api.get(`/users/${decoded.id}`);
            userData = response.data.user;
          }

          setUser({ ...userData, role: decoded.role });
        } catch (error) {
          console.error('Error initializing auth:', error);
          logout(); // Now properly defined
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { 
        email: String(email), // Explicit conversion
        password: String(password)
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setToken(response.data.token);
        setUser(response.data.user);
        return { success: true };
      }
      
      return { success: false, message: response.data.msg || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error.response?.data);
      return { 
        success: false, 
        message: error.response?.data?.msg || 'Login failed' 
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.msg || 'Signup failed' };
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated,
        hasRole,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);