import { useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { setAuth } = useAuth();

  useEffect(() => {
    const accessToken = atob(token).split("+")[0];
    setAuth({ accessToken });

    navigate("/");
  }, []);

  return <Outlet></Outlet>;
};

export default AuthCallbackPage;
