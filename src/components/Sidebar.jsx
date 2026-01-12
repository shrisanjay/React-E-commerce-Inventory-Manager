import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Folder } from 'lucide-react';
import './Sidebar.css';

const categories = [
  "electronics", 
  "jewelery", 
  "men's clothing", 
  "women's clothing"
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <ShoppingBag className="brand-icon" size={28} />
        <h1 className="brand-name">Inventory</h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <div className="nav-divider">Categories</div>
        
        {categories.map(cat => (
          <NavLink 
            key={cat}
            to={`/category/${encodeURIComponent(cat)}`}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Folder size={18} />
            <span className="capitalize">{cat}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
