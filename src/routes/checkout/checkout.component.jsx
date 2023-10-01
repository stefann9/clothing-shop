import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item";
const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="checkout-container">
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
    </div>
  );
};
export default Checkout;
