import { Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout";
import LoginAndSingupPage from "../Pages/LoginAndSingupPage";
import LogIn from "../users/LogIn";
import SignUp from "../users/SingUp";
import HomePage from "../Pages/HomePage";
import RequireAuth from "../hoc/RequireAuth";
import ProfilePage from "../Pages/ProfilePage";
import UnActivatedPage from "../Pages/UnActivatedPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
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
      </Route>
    </Routes>
  );
}

export default App;
