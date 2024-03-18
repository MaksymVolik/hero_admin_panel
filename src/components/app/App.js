import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Pages/Layout";
import LoginAndSingupPage from "../Pages/LoginAndSingupPage";
import LogIn from "../users/LogIn";
import SignUp from "../users/SingUp";
import HomePage from "../Pages/HomePage";
import RequireAuth from "../Pages/RequireAuth";
import ProfilePage from "../Pages/ProfilePage";
import UnActivatedPage from "../Pages/UnActivatedPage";
import NotFound from "../Pages/NotFound";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="activated" element={<UnActivatedPage />} />
          <Route
            path="login"
            element={
              <LoginAndSingupPage>
                <LogIn />
              </LoginAndSingupPage>
            }
          />
          <Route
            path="register"
            element={
              <LoginAndSingupPage>
                <SignUp />
              </LoginAndSingupPage>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
