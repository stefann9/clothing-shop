const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  return (
    <div className="checkout-item-container">
      <img src={imageUrl} alt={name} />
      <span className="description">{name}</span>
      <span className="quantity">
        <button>{"<"}</button>
        {quantity}
        <button>{">"}</button>
      </span>
      <span className="price">{price}</span>
      <button className="remove">x</button>
    </div>
  );
};
export default CheckoutItem;
