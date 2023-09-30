import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../hooks/Context";

const Navbar = () => {
  const { user: authUser, setUser, setBuses } = useGlobalContext();
  let user;
  if (authUser) {
    user = authUser.user;
  } else {
    user = null;
  }

  const handleSubmit = () => {
    setUser(null);
    setBuses(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <nav
        id="mainNavbar"
        className="navbar navbar-expand-md navbar-dark bg-success py-0 "
        // style={{ background: "black" }}
      >
        <div className="navbar-brand">
          <NavLink className="nav-link" to="/">
            <h2>TicketBooking</h2>
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            {!authUser && (
              <>
                <li className="nav-item" id="1">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item" id="2">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {authUser && user && (
              <>
                <li className="nav-item" id="3">
                  <NavLink className="nav-link" to="/dashboard">
                    Welcome,{user.username}
                  </NavLink>
                </li>
                <li className="nav-item" id="4">
                  <NavLink className="nav-link" to="/" onClick={handleSubmit}>
                    Logout
                  </NavLink>
                </li>
                <li className="nav-item " id="5">
                  <NavLink className="nav-link" to="/ticketbooking">
                    ticketbooking
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
