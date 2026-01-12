import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';

// Lazy load route components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CategoryView = lazy(() => import('./pages/CategoryView'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

const LoadingSpinner = () => (
  <div className="loading-state">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="category/:slug" element={<CategoryView />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
