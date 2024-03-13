import { Link } from "react-router-dom";
import LogIn from "../users/LogIn";

const LoginPage = () => {
  return (
    <main className="app">
      <div className="content">
        <div>
          <h1 className="text-center">Log in</h1>
          <LogIn />
          <p className="text-center mt-3">
            Or <Link to="/register">Create yuor account</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
