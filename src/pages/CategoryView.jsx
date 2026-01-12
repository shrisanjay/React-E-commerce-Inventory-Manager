import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useProductIngestion from '../hooks/useProductIngestion';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import './Dashboard.css';

const CategoryView = () => {
  const { slug } = useParams();
  const { products, loading, error } = useProductIngestion();


  const categoryProducts = useMemo(() => {
    if (!products.length) return [];
    const target = decodeURIComponent(slug);
    return products.filter(p => p.category === target);
  }, [products, slug]);

  const categoryName = decodeURIComponent(slug);

  if (loading) return <div className="loading-state"><div className="spinner"></div></div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="dashboard-page">
      <SEO 
        title={`${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`} 
        description={`Browse our collection of ${categoryName} products.`} 
      />
      <header className="page-header">
        <div>
          <h2 className="page-title capital">{decodeURIComponent(slug)}</h2>
          <p className="page-meta">Category Inventory</p>
        </div>
        <div className="total-badge">
          {categoryProducts.length} Items
        </div>
      </header>

      {categoryProducts.length > 0 ? (
        <div className="inventory-grid">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryView;
