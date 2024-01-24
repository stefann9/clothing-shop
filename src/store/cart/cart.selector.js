import { createSelector } from "reselect";

export const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cartItemsSlice) => cartItemsSlice.cartItems )
export const selectIsCartOpen = createSelector([selectCartReducer], (cartItemsSlice) => cartItemsSlice.isCartOpen )

export const selectCartCount = createSelector([selectCartItems], (cartItemsSlice) =>
  cartItemsSlice.reduce((prevValue, currentValue) => prevValue + currentValue.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItemsSlice) =>
  cartItemsSlice.reduce(
    (prevValue, currentValue) => prevValue + currentValue.quantity * currentValue.price,
    0
  )
);