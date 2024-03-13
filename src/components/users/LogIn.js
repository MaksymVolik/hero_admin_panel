import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "../../auth/authSlice";
import { useLoginMutation } from "../../auth/authApiSlice";

import LoginForm from "./LoginForm";
import Spinner from "../spinner/Spinner";
import * as Yup from "yup";

const LogIn = () => {
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const handleRegister = async ({ email, password }) => {
    try {
      const userData = await login({
        email,
        password,
      }).unwrap();
      console.log(userData);

      dispatch(setCredentials({ ...userData }));
      navigate(fromPage, { replace: true });
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <LoginForm
      title="login"
      handleClick={handleRegister}
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
  );
};

export default LogIn;
