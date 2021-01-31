import React from "react";
import LoginButton from "./LoginButton";
import SignupButton from './SignupButton';
import logo from '../assets/images/logo.svg';

const NavbarHome = () => {
  return (
      <nav>

        <div className="flex justify-between items-center h-16 m-auto px-6 max-w-6xl">
          <div>
            <img src={logo} />
          </div>

          <div className="px-6">
            <LoginButton />
            <SignupButton />
          </div>
        </div>

      </nav>
  );
};

export default NavbarHome;
