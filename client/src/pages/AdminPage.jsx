import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminPage = () => {
  return (
    <div >
      <Navbar/>
        <div>
          Hi Welcome Back Admin👋
        </div>
        
      <Outlet />
    </div>
  );
};

export default AdminPage;