import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { checkAuth } from "../../auth/authSlice";
import Header from "./Header";

const Layout = () => {
  // const token = useSelector((state) => state.auth.token);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (token) {
  //     // dispatch(checkAuth());
  //     console.log("checkAuth");
  //   }
  // }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
