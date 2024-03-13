import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userApiSlice } from "../../auth/userApiSlice";
import Spinner from "../spinner/Spinner";

const RequireAuth = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  const { isLoading, isFetching } = userApiSlice.endpoints.getMe.useQuery(
    null,
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const loading = isLoading || isFetching;

  console.log(loading);

  const user = userApiSlice.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  if (loading) {
    return <Spinner />;
  }

  // const { user } = data;
  console.log("data: " + JSON.stringify(user));

  return token && user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
