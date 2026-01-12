import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="layout-root">
      <Sidebar />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
