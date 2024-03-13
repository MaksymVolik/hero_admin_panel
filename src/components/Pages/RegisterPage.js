import { Link } from "react-router-dom";
import SignUp from "../users/SingUp";

const RegisterPage = () => {
  return (
    <main className="app">
      <div className="content">
        <div>
          <h1 className="text-center">Create your account</h1>
          <SignUp />
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
