import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../../auth/userApiSlice";
import Spinner from "../spinner/Spinner";

const RequireAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const { isLoading, isFetching } = useGetMeQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  // const user = userApiSlice.endpoints.getMe.useQueryState(null, {
  //   selectFromResult: ({ data }) => data,
  // });

  const loading = isLoading || isFetching || (token && !user);

  if (loading) {
    return <Spinner />;
  }

  return (token || user) && user?.isActivated ? (
    <Outlet />
  ) : token && user ? (
    <Navigate to="/activated" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
