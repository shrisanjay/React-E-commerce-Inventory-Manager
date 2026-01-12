import React from 'react';
import useProductIngestion from '../hooks/useProductIngestion';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import './Dashboard.css';

const Dashboard = () => {
  const { products, loading, error } = useProductIngestion();
  
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading Inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>Connection Failed</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <SEO 
        title="Dashboard" 
        description="Overview of all active inventory in your e-commerce store." 
      />
      <header className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-meta">Overview of all active inventory</p>
        </div>
        <div className="total-badge">
          {products.length} Products
        </div>
      </header>

      <div className="inventory-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
