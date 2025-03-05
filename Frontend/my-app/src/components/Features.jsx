import React from 'react';
import '../styles/Features.css'; // Import the CSS file

const Features = () => {
  return (
    <div className="features-section">
      <div className="container">
        <h2 className="title">Key Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h4>User Registration</h4>
            <p>Quickly sign up to create an account and access the inventory management system.</p>
          </div>
          <div className="feature-item">
            <h4>User Authentication</h4>
            <p>Securely log in to your account to access the inventory management system.</p>
          </div>
          <div className="feature-item">
            <h4>Product and Stock Information</h4>
            <p>View detailed product data including quantities, names, and images for easy tracking.</p>
          </div>
        </div>
        <div className="feature-list">
          <div className="feature-item">
            <h4>Role-Based Access</h4>
            <p>Assign and manage permissions for owners and employees to control access levels.</p>
          </div>
          <div className="feature-item">
            <h4>Product Data Visualization</h4>
            <p>View product performance and stock trends through insightful graphs and charts.</p>
          </div>
          <div className="feature-item">
            <h4>Employee Inventory Management</h4>
            <p>Enable employees to adjust stock levels and keep your inventory up to date in real-time.</p>
          </div>
        </div>
        <div className="feature-list">
          <div className="feature-item">
            <h4>Low Stock Alerts</h4>
            <p>Receive automatic notifications when product quantities fall below set thresholds, preventing stockouts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
