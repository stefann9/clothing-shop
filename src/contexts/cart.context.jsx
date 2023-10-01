import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const productAlreadyInCart = cartItems.find((item) => item.id === productToAdd.id);
  if (productAlreadyInCart)
    return cartItems.map((item) =>
      item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const cartItem = cartItems.find((item) => item.id === cartItemToRemove.id);
  if (cartItem.quantity > 1) {
    return cartItems.map((item) =>
      item.id === cartItemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
  return totalRemoveCartItem(cartItems, cartItemToRemove);
};

const totalRemoveCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((item) => item.id !== cartItemToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  totalRemoveItemFromCart: () => null,
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemsToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemFromCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

  const totalRemoveItemFromCart = (cartItemToRemove) =>
    setCartItems(totalRemoveCartItem(cartItems, cartItemToRemove));

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (prevValue, currentValue) => prevValue + currentValue.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (prevValue, currentValue) => prevValue + currentValue.quantity * currentValue.price,
      0
    );

    setCartTotal(newTotal);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    addItemsToCart,
    removeItemFromCart,
    totalRemoveItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
