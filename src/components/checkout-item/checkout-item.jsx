import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  const { addItemsToCart } = useContext(CartContext);
  const addItemHandler = () => addItemsToCart(cartItem);

  return (
    <div className="checkout-item-container">
      <img src={imageUrl} alt={name} />
      <span className="description">{name}</span>
      <span className="quantity">
        <button>{"<"}</button>
        {quantity}
        <button onClick={addItemHandler}>{">"}</button>
      </span>
      <span className="price">{price}</span>
      <button className="remove">x</button>
    </div>
  );
};
export default CheckoutItem;
