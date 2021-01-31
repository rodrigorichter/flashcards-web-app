import React from "react";
import LoginButton from "./LoginButton";
import SignupButton from './SignupButton';
import logo from '../assets/images/logo.svg';
import Button from "./Button";
import { HiOutlineHome } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import LogoutButton from './LogoutButton';

const NavbarApp = () => {
  return (
      <nav className="bg-primary">

        <div className="flex items-center h-16 m-auto px-6">
          <Button iconwhite><HiOutlineHome size={24} /></Button>
          <Button iconwhite><HiPlus size={24} /></Button>
          <LogoutButton />
        </div>

      </nav>
  );
};

export default NavbarApp;
