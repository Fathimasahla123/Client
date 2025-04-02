import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    items: [],
    orderType: 'Dine-in',
    deliveryAddress: '',
    specialInstructions: '',
  });
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get('/products');
        setMenuItems(response.data.products);
        
        // If coming from menu page with a specific item selected
        if (location.state?.itemId) {
          const selectedItem = response.data.products.find(
            item => item._id === location.state.itemId
          );
          if (selectedItem) {
            setFormData(prev => ({
              ...prev,
              items: [{ dishId: selectedItem._id, dishName: selectedItem.name, quantity: 1, price: selectedItem.price }]
            }));
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = field === 'quantity' ? parseInt(value) : value;
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { dishId: '', dishName: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        ...formData,
        totalAmount: formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
      
      await api.post('/orders', orderData);
      navigate('/customer');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to place order');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page">
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Order Type</label>
          <select
            name="orderType"
            value={formData.orderType}
            onChange={handleChange}
          >
            <option value="Dine-in">Dine-in</option>
            <option value="Delivery">Delivery</option>
            <option value="Takeaway">Takeaway</option>
          </select>
        </div>

        {formData.orderType === 'Delivery' && (
          <div className="form-group">
            <label>Delivery Address</label>
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <h3>Order Items</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="card order-item">
            <div className="form-group">
              <label>Item</label>
              <select
                value={item.dishId}
                onChange={(e) => {
                  const selectedItem = menuItems.find(i => i._id === e.target.value);
                  handleItemChange(index, 'dishId', e.target.value);
                  handleItemChange(index, 'dishName', selectedItem?.name || '');
                  handleItemChange(index, 'price', selectedItem?.price || 0);
                }}
                required
              >
                <option value="">Select an item</option>
                {menuItems.map(menuItem => (
                  <option key={menuItem._id} value={menuItem._id}>
                    {menuItem.name} (${menuItem.price.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Price: ${(item.price * item.quantity).toFixed(2)}</label>
            </div>

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="btn btn-secondary"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="btn btn-secondary"
        >
          Add Item
        </button>

        <div className="form-group">
          <label>Special Instructions</label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h3>Total: $
            {formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
          </h3>
        </div>

        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;