import { ButtonGroup } from "@chakra-ui/react";
import LoginGitHubButton from "./LoginGitHubButton.jsx";
import LoginGoogleButton from "./LoginGoogleButton.jsx";

const LoginForm = () => {
  return (
    <ButtonGroup>
      <LoginGitHubButton />
      <LoginGoogleButton />
    </ButtonGroup>
  );
};

export default LoginForm;
