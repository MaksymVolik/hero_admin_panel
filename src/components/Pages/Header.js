import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../auth/authSlice";
import { useLogoutMutation } from "../../auth/authApiSlice";

const setActive = ({ isActive }) => (isActive ? "active-link" : "");

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    // dispatch(logOut());
  };

  const contentHeader = user ? (
    <>
      <p>{`Hi, ${user.username}`}</p>
      <button className="btn btn-light" onClick={() => navigate("/profile")}>
        Profile
      </button>
      <button className="btn btn-light" onClick={onLogout}>
        Log out
      </button>
    </>
  ) : (
    <>
      <NavLink to="login" className={setActive}>
        Log in
      </NavLink>
      <NavLink to="register" className={setActive}>
        Sing up
      </NavLink>
    </>
  );
  return (
    <header className="header">
      <h1 onClick={() => navigate("/")}>Hero admin panel</h1>
      {contentHeader}
    </header>
  );
};

export default Header;
