import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const productAlreadyInCart = cartItems.find((item) => item.id === productToAdd.id);
  if (productAlreadyInCart)
    return cartItems.map((item) =>
      item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemsToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (prevValue, currentValue) => prevValue + currentValue.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);


  const value = { isCartOpen, setIsCartOpen, cartItems, addItemsToCart, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
