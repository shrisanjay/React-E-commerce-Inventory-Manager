import React from 'react';
import { Plus, Minus, AlertCircle } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { drafts, updateDraft } = useInventory();
  
  const originalStock = product.rating?.count || 0;
  const draftStock = drafts[product.id];
  const hasDraft = draftStock !== undefined;
  
  const currentDisplayStock = hasDraft ? draftStock : originalStock;
  
  const handleIncrement = (e) => {
    e.preventDefault();
    updateDraft(product.id, currentDisplayStock + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (currentDisplayStock > 0) {
      updateDraft(product.id, currentDisplayStock - 1);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      
      <div className="product-content">
        <h3 className="product-title" title={product.title}>{product.title}</h3>
        <div className="product-price">{product.formattedPrice}</div>
        
        <div className="inventory-controls-wrapper" onClick={e => e.preventDefault()}>
           <div className="stock-status">
             <span className="label">Stock</span>
             <span className={`value ${hasDraft ? 'draft' : ''}`}>{currentDisplayStock}</span>
             {hasDraft && <span className="original">({originalStock})</span>}
           </div>
           
           <div className="buttons">
             <button onClick={handleDecrement} disabled={currentDisplayStock <= 0}><Minus size={16}/></button>
             <button onClick={handleIncrement}><Plus size={16}/></button>
           </div>
        </div>

        {hasDraft && (
          <div className="draft-alert">
            <AlertCircle size={14} /> Unsaved
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
