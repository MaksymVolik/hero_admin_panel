import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { setCredentials } from "../../auth/authSlice";
import { useRegistrationMutation } from "../../auth/authApiSlice";

import LoginForm from "./LoginForm";
import Spinner from "../spinner/Spinner";
import { errMsg } from "../../hooks/errMsg";

const SignUp = () => {
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
      dispatch(setCredentials({ ...userData }));
      navigate("/");
    } catch (err) {
      errMsg(err);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="text-center mb-4">Create your account</h1>

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
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </>
  );
};

export default SignUp;
