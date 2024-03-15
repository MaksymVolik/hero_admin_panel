import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userApiSlice } from "../../auth/userApiSlice";
import Spinner from "../spinner/Spinner";
import { useEffect } from "react";

const RequireAuth = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
  } = userApiSlice.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  // const user = userApiSlice.endpoints.getMe.useQueryState(null, {
  //   selectFromResult: ({ data }) => data,
  // });

  console.log(JSON.stringify(user));

  useEffect(() => {
    if (token && !user) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = isLoading || isFetching;

  if (loading) {
    return <Spinner />;
  }

  // console.log("user.isActivated: " + user.isActivated);
  // const isActivated = user.isActivated;

  return (token || user) && user?.isActivated ? (
    children
  ) : token && user ? (
    <Navigate to="/activated" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
