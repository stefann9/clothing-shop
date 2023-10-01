import { createContext, useState } from "react";

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
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const addItemsToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemsToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
