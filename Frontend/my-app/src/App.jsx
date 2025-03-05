import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ensure Navbar is properly imported
import Home from './components/Home';
import Features from './components/Features'; // Import the Features component
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from "./components/Products";
import Admin from "./components/Admin"
export const App = () => {
  return (
    <div>
     <Router>
        <Navbar/>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="/features" element={<Features />} />
          <Route path="/login/products" element={<Products />} />
          <Route path="/login/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App