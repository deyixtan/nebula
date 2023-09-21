import { Box, Button, Stack, Typography } from "@mui/material";
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
    <Box width="300px">
      <Typography variant="sm" fontStyle="italic">
        Continue with:
      </Typography>
      <Stack justifyContent="center" marginTop="20px" spacing="10px">
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
    </Box>
  );
};

export default LoginForm;
