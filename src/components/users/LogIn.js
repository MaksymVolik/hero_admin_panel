import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import * as Yup from "yup";
import { setCredentials } from "../../auth/authSlice";
import { useLoginMutation } from "../../auth/authApiSlice";

import LoginForm from "./LoginForm";
import Spinner from "../spinner/Spinner";
import { errMsg } from "../../hooks/errMsg";

const LogIn = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const handleLogin = async ({ email, password }) => {
    try {
      const userData = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate(fromPage, { replace: true });
    } catch (err) {
      errMsg(err);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="text-center mb-4">Log in</h1>
      <LoginForm
        title="login"
        handleClick={handleLogin}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("This is not a valid email address")
            .required("Required field"),
          password: Yup.string()
            .min(3, "Minimum length of 3 characters!")
            .max(32, "Maximum length of 3 characters!")
            .required("Required field!"),
        })}
      />
      <p className="text-center mt-3">
        Or <Link to="/register">Create yuor account</Link>
      </p>
    </>
  );
};

export default LogIn;
