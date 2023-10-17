import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.style.scss";
const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  const { addItemsToCart, removeItemFromCart, totalRemoveItemFromCart } = useContext(CartContext);
  const addItemHandler = () => addItemsToCart(cartItem);
  const totalRemoveItemHandler = () => totalRemoveItemFromCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={totalRemoveItemHandler}>
        &#10005;
      </div>
    </div>
  );
};
export default CheckoutItem;