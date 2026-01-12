import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, AlertTriangle } from 'lucide-react';
import useProductIngestion from '../hooks/useProductIngestion';
import { useInventory } from '../context/InventoryContext';
import SEO from '../components/SEO';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProductIngestion();
  const { drafts, updateDraft } = useInventory();


  const product = useMemo(() => 
    products.find(p => p.id === parseInt(id)), 
  [products, id]);

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!product) return <div className="error-state">Product not found</div>;


  const originalStock = product.rating?.count || 0;
  const draftStock = drafts[product.id];
  const hasDraft = draftStock !== undefined;
  const currentStock = hasDraft ? draftStock : originalStock;

  return (
    <div className="detail-page">
      <SEO 
        title={product.title} 
        description={product.description.slice(0, 160)} 
        type="product"
      />
      <button onClick={() => navigate(-1)} className="back-link">
        <ArrowLeft size={18} /> Back to List
      </button>

      <div className="detail-layout">
        <div className="image-panel">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="info-panel">
          <div className="top-meta">
            <span className="cat-tag">{product.category}</span>
            <div className="rating">
              <Star size={16} fill="#fbbf24" stroke="none" />
              <span>{product.rating?.rate} ({product.rating?.count})</span>
            </div>
          </div>

          <h1 className="title">{product.title}</h1>
          <div className="price">{product.formattedPrice}</div>
          <p className="desc">{product.description}</p>

          <div className="inventory-box">
            <header>
              <h3>Inventory Management</h3>
              {hasDraft && <span className="unsaved-badge"><AlertTriangle size={14}/> Unsaved Changes</span>}
            </header>

            <div className="stock-control-row">
              <div className="stock-readout">
                <span className="label">Current Level</span>
                <div className="numbers">
                  <span className={`big-num ${hasDraft ? 'draft' : ''}`}>{currentStock}</span>
                  {hasDraft && <span className="original">was {originalStock}</span>}
                </div>
              </div>

              <div className="actions">
                <button onClick={() => updateDraft(product.id, currentStock - 1)} disabled={currentStock <= 0}>
                  Decrease
                </button>
                <button onClick={() => updateDraft(product.id, currentStock + 1)} className="primary">
                  Increase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
