import { useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useWebSocket from "../../hooks/useWebSocket";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { setAuth } = useAuth();
  const socket = useWebSocket();

  useEffect(() => {
    const accessToken = atob(token).split("+")[0];
    setAuth({ accessToken, socket });

    navigate("/");
  }, []);

  return <Outlet></Outlet>;
};

export default AuthCallbackPage;
