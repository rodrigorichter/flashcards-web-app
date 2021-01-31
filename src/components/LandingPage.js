import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Application from './Application';
import AuthenticationButton from './AuthenticationButton';
import NavbarHome from './NavbarHome';
import Loading from './Loading';
import Profile from './../views/Profile';
import ProtectedRoute from './../auth/protected-route';
import Button from './Button';
import Background from '../assets/images/bg_hero.svg';

function LandingPage() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  else {

    return (
      <div className="h-screen bg-local bg-no-repeat bg-bottom" style={{backgroundImage: `url(${Background})`}}>
        <NavbarHome />
        <h1 className="leading-snug m-auto px-6 max-w-4xl text-center pt-16 sm:pt-48 ">Create, edit and review flashcards with Quicards</h1>
        <div className="flex justify-center pt-12">
          <Button regular large className="">DISCOVER FEATURES</Button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
