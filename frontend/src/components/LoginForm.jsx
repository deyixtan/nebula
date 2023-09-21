import { Button, Stack } from "@mui/material";
import { GitHub, Google } from "@mui/icons-material";
import {
  BACKEND_AUTH_GITHUB_PROVIDER,
  BACKEND_AUTH_GOOGLE_PROVIDER,
} from "../config.jsx";

const LoginForm = () => {
  const handleGithubClick = () => {
    location.href = BACKEND_AUTH_GITHUB_PROVIDER;
  };

  const handleGoogleClick = () => {
    location.href = BACKEND_AUTH_GOOGLE_PROVIDER;
  };

  return (
    <Stack justifyContent="center" spacing="10px">
      <Button
        variant="contained"
        color="primary"
        startIcon={<GitHub />}
        onClick={handleGithubClick}
      >
        GitHub
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Google />}
        onClick={handleGoogleClick}
      >
        Google
      </Button>
    </Stack>
  );
};

export default LoginForm;
