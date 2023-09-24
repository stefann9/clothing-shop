import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          LOGO
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
