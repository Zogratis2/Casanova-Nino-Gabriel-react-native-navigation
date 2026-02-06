import React, { createContext, useContext, useState } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;

  stocks: { [key: number]: number };
  checkoutAndReduceStock: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [cart, setCart] = useState<CartItem[]>([]);

  // 👇 ADDED STOCK STATE (FROM YOUR HomeScreen)
  const [stocks, setStocks] = useState<{ [key: number]: number }>({
    1: 5,
    2: 10,
    3: 8,
    4: 15,
    5: 2,
    6: 12,
    7: 20,
    8: 7,
    9: 9,
    10: 6,
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  // 👇 NEW FUNCTION FOR CHECKOUT
  const checkoutAndReduceStock = () => {
    setStocks(prev => {
      const updated = { ...prev };

      cart.forEach(item => {
        updated[item.id] = updated[item.id] - item.quantity;
      });

      return updated;
    });

    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        clearCart,

        stocks,
        checkoutAndReduceStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
