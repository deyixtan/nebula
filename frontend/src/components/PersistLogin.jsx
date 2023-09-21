import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Backdrop color="#ffffff" open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Outlet />
      )}
    </React.Fragment>
  );
};

export default PersistLogin;
