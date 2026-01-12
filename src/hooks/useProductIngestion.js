import { useState, useEffect } from 'react';

const useProductIngestion = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();


        const transformedData = data.map(product => ({
          ...product,
          formattedPrice: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(product.price)
        }));

        setProducts(transformedData);
        setError(null);
      } catch (err) {
        console.error('Data Ingestion Error:', err);
        setError(err.message || 'Failed to ingest product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProductIngestion;
