import { createContext, useReducer } from "react";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const addItemsToCart = (productToAdd) =>
    updateCartItemsReducer(addCartItem(cartItems, productToAdd));

  const removeItemFromCart = (cartItemToRemove) =>
    updateCartItemsReducer(removeCartItem(cartItems, cartItemToRemove));

  const totalRemoveItemFromCart = (cartItemToRemove) =>
    updateCartItemsReducer(totalRemoveCartItem(cartItems, cartItemToRemove));

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (prevValue, currentValue) => prevValue + currentValue.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (prevValue, currentValue) => prevValue + currentValue.quantity * currentValue.price,
      0
    );
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      },
    });
  };

  const setIsCartOpen = (isCartOpen) =>
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen });

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
