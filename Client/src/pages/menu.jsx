import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/authContext';
import MenuCard from '../components/CommonComponents/menuCard';
import api from '../components/services/api';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get('/products');
        setMenuItems(response.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleOrderNow = (itemId) => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: '/menu' } });
    } else {
      navigate('/customer/order', { state: { itemId } });
    }
  };

  if (loading) return <div className="page">Loading menu...</div>;
  if (error) return <div className="page">Error: {error}</div>;
  if (!menuItems || menuItems.length === 0) return <div className="page">No menu items available</div>;
  return (
    <div className="page">
      <h1>Our Menu</h1>
      <div className="card-grid">
        {menuItems.map((item) => (
          <MenuCard 
            key={item._id} 
            item={item} 
            onOrderNow={() => handleOrderNow(item._id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;