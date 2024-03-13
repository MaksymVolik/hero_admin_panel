import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../auth/authSlice";
import { useRegistrationMutation } from "../../auth/authApiSlice";

import LoginForm from "./LoginForm";
import Spinner from "../spinner/Spinner";
import * as Yup from "yup";

const SignUp = () => {
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const [registration, { isLoading }] = useRegistrationMutation();
  const navigate = useNavigate();

  const handleRegister = async ({ username, email, password }) => {
    try {
      const userData = await registration({
        username,
        email,
        password,
      }).unwrap();
      console.log(userData);

      dispatch(setCredentials({ ...userData }));
      navigate("/");
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
      title="register"
      handleClick={handleRegister}
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, "Minimum length of 3 characters!")
          .max(50, "Maximum length of 3 characters!")
          .required("Required field!"),
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

export default SignUp;
