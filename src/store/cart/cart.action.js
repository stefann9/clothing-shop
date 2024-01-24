import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (isCartOpen) => {
  return { type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen };
};

export const addItemsToCart = (productToAdd, cartItems) => {
  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: addCartItem(cartItems, productToAdd) };
};

export const removeItemFromCart = (cartItemToRemove, cartItems) => {
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: removeCartItem(cartItems, cartItemToRemove),
  };
};

export const totalRemoveItemFromCart = (cartItemToRemove, cartItems) => {
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: totalRemoveCartItem(cartItems, cartItemToRemove),
  };
};

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
