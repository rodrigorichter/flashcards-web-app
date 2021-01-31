import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from './Button';

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button text
            onClick={() =>
              loginWithRedirect({
                screen_hint: "signup",
              })
            }>
      Sign up
    </Button>
  );
};

export default SignupButton;
