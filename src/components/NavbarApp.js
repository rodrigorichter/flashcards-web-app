import React, { useState, useRef, useEffect } from 'react';
import LoginButton from "./LoginButton";
import SignupButton from './SignupButton';
import logo from '../assets/images/logo.svg';
import Button from "./Button";
import { HiOutlineHome } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import LogoutButton from './LogoutButton';
import { IoPersonCircleSharp } from "react-icons/io5";
import { useAuth0 } from "@auth0/auth0-react";

const NavbarApp = () => {
  const { logout, user } = useAuth0();
  const { name, picture, email } = user;
  const [ profileDropdownIsOpen, setProfileDropdownIsOpen ] = useState(false);
  const node = useRef();

  const handleClick = e => {
    if (node.current.contains(e.target)) {

      return;
    }
    setProfileDropdownIsOpen(false)
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const profileDropdown = (
    <div className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div className="py-1" >
          <div className="block px-4 py-1 text-sm text-textsecond hover:bg-gray-100 hover:text-textfirst cursor-pointer" role="menuitem">
            <p className="text-xs mb-2">{email}</p>
            <p>Settings</p>
          </div>
        </div>
        <div className="py-1" >
          <a className="block px-4 py-1 text-sm text-textsecond hover:bg-gray-100 hover:text-textfirst cursor-pointer"
            onClick={() => logout({returnTo: window.location.origin,})}
            role="menuitem">Log out
          </a>
        </div>
      </div>
    </div>
  );


  return (
      <nav className="bg-primary">

        <div className="flex items-center justify-between h-12 m-auto px-6">
          <div>
            <Button iconwhite><HiOutlineHome size={24} /></Button>
            <Button iconwhite><HiPlus size={24} /></Button>
          </div>
          <div ref={node} className="relative inline-block text-left">
            <Button iconwhite onClick={() => {setProfileDropdownIsOpen(!profileDropdownIsOpen)}}><IoPersonCircleSharp size={24} /></Button>
            {profileDropdownIsOpen && profileDropdown}
          </div>

        </div>
      </nav>
  );
};

export default NavbarApp;
