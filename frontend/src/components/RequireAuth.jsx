import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const RequireAuth = () => {
  const [cookies, setCookie] = useCookies(["session"]);

  const location = useLocation();

  console.log("aaa", document.cookie);
  return session ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
