import React from 'react';

const MenuCard = ({ item, onOrderNow }) => {
  // Construct image path - adjust based on where you stored images
  const imagePath = item.image 
    ? `/images/menu/${item.image}` 
    : '/images/menu/default.jpg';

  return (
    <div className="card menu-card">
      <div className="menu-card-image">
        <img 
          src={imagePath} 
          alt={item.name} 
          onError={(e) => {
            e.target.src = '/images/menu/default.jpg'; // Fallback image
          }}
        />
      </div>
      <div className="menu-card-content">
        <h3>{item.name}</h3>
        <p className="price">${item.price.toFixed(2)}</p>
        <p className="description">{item.description}</p>
        <div className="menu-card-actions">
          <button onClick={onOrderNow} className="btn">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;