import React from 'react';
import '../styles/Home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div 
  className="home-container text-center d-flex align-items-center justify-content-center vh-100" 
  style={{ 
    backgroundImage: "url('https://plus.unsplash.com/premium_photo-1683309565422-77818a287060?fm=jpg&q=60&w=3000')", 
    backgroundSize: "cover", 
    backgroundPosition: "center" 
  }}
>
  <div 
    className="p-5 rounded" 
    style={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.4)', 
      color: 'white' // Ensure text inside this div is white
    }}
  >
    <h1 className="display-3 fw-bold">Inventory Management System</h1>
    <p className="mt-4 fs-5" style={{ color: 'white' }}>
      Our Inventory Management System helps businesses streamline stock tracking, 
      optimize inventory levels, and improve efficiency. Designed for seamless use, 
      it ensures that your inventory processes are hassle-free and reliable.
    </p>
  </div>
</div>


  );
};

export default Home;
