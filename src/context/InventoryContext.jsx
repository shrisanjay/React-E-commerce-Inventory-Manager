import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {

  const [drafts, setDrafts] = useState({});

  const updateDraft = useCallback((productId, newStock) => {
    setDrafts(prev => ({
      ...prev,
      [productId]: newStock
    }));
  }, []);

  const clearDraft = useCallback((productId) => {
    setDrafts(prev => {
      const newDrafts = { ...prev };
      delete newDrafts[productId];
      return newDrafts;
    });
  }, []);

  const value = useMemo(() => ({
    drafts,
    updateDraft,
    clearDraft
  }), [drafts, updateDraft, clearDraft]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
