import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, Value, RemoveButton } from "./checkout-item.style";
const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  const { addItemsToCart, removeItemFromCart, totalRemoveItemFromCart } = useContext(CartContext);
  const addItemHandler = () => addItemsToCart(cartItem);
  const totalRemoveItemHandler = () => totalRemoveItemFromCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow className="arrow" onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={totalRemoveItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
