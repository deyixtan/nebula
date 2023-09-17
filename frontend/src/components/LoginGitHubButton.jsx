import { Button, Icon } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const LoginGitHubButton = () => {
  const login = () => {
    window.location.replace("http://localhost:5000/authorize/github");
  };

  return (
    <Button colorScheme="gray" onClick={login}>
      Login with &nbsp;
      <Icon as={FaGithub} />
      &nbsp; GitHub
    </Button>
  );
};

export default LoginGitHubButton;
