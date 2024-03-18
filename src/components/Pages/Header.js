import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../auth/authApiSlice";
import { SpinnerBtn } from "../spinner/Spinner";
import { apiSlice } from "../../api/apiSlice";
import { errMsg } from "../../hooks/errMsg";

const setActive = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [logout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    await logout();
    dispatch(apiSlice.util.resetApiState());
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("login", { replace: true });
    }

    if (isError) errMsg(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const contentHeader = user ? (
    <div className="row align-items-center">
      <div className="col-auto fs-5 pe-5">{`Hi, ${user.username}`}</div>
      <div className="col-auto">
        <div
          className="d-grid gap-2 d-md-flex justify-content-md-end"
          role="group"
        >
          <button
            className="col-7 btn btn-primary"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className="col-7 btn btn-primary"
            onClick={onLogout}
            disabled={isLoading}
          >
            {isLoading ? <SpinnerBtn title={`Log out`} /> : "Log out"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-grid gap-2 d-md-flex justify-content-md-end" role="group">
      <NavLink to="login" className={`col-7 btn btn-primary ${setActive}`}>
        Log in
      </NavLink>
      <NavLink to="register" className={`col-7 btn btn-primary ${setActive}`}>
        Sing up
      </NavLink>
    </div>
  );
  return (
    <header
      className="container-fluid bg-primary text-white"
      style={{ "--bs-bg-opacity": 0.4 }}
    >
      <div className="row px-5 justify-content-around align-items-center">
        <div className="col-auto me-auto">
          <div className="fs-1 pointer" onClick={() => navigate("/")}>
            Hero admin panel
          </div>
        </div>
        <div className="col-auto">{contentHeader}</div>
      </div>
    </header>
  );
};

export default Header;
