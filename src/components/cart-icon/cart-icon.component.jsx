import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.style.scss";
const CartIcon = () => {
  return (
    <div>
      <ShoppingIcon />
      <span>0</span>
    </div>
  );
};
export default CartIcon;
