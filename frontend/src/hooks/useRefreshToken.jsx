import useAuth from "./useAuth.jsx";
import useAxiosPublic from "./useAxiosPublic";
import useWebSocket from "./useWebSocket";
import { BACKEND_REFRESH_URL } from "../config";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const axiosPublic = useAxiosPublic();

  const refresh = async () => {
    const response = await axiosPublic.post(BACKEND_REFRESH_URL);

    const { accessToken } = response.data;

    const socket = useWebSocket();

    setAuth((prev) => {
      return {
        ...prev,
        accessToken,
        socket,
      };
    });
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
