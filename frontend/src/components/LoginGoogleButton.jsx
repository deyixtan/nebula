import { FaGoogle } from "react-icons/fa";
import { Button, Icon } from "@chakra-ui/react";

const LoginGoogleButton = () => {
  const login = () => {
    window.location.replace("http://localhost:5000/authorize/google");
  };

  return (
    <Button colorScheme="gray" onClick={login}>
      Login with &nbsp;
      <Icon as={FaGoogle} />
      &nbsp; Google
    </Button>
  );
};

export default LoginGoogleButton;
