// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";

import { Link } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.style.jsx";


const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  // const { cartItems } = useContext(CartContext);
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Link to="/checkout">
        <Button>GO TO CHECKOUT</Button>
      </Link>
    </CartDropdownContainer>
  );
};
export default CartDropdown;
