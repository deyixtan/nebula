import useAuth from "./useAuth.jsx";
import useAxiosPublic from "./useAxiosPublic";
import { BACKEND_REFRESH_URL } from "../config";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const axiosPublic = useAxiosPublic();

  const refresh = async () => {
    const response = await axiosPublic.post(BACKEND_REFRESH_URL);

    const { accessToken } = response.data;

    setAuth((prev) => {
      return {
        ...prev,
        accessToken,
      };
    });
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
