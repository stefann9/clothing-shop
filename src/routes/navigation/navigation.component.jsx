// import { useContext } from "react";
// import { UserContext } from "../../contexts/user.context";
// import { CartContext } from "../../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import { selectCurrentUser } from "../../store/user/user.selector.js";
import { selectIsCartOpen } from "../../store/cart/cart.selector.js";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
// import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.style.jsx";
import { signOutStart } from "../../store/user/user.action.js";
const Navigation = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  // const { currentUser } = useContext(UserContext);
  // const { isCartOpen } = useContext(CartContext);
  const signOut = () => dispatch(signOutStart())
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" to="/auth" onClick={signOut}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
