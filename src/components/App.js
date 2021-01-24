import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Application from './Application';
import AuthenticationButton from './AuthenticationButton';
import Loading from './Loading';
import Profile from './../views/Profile';
import ProtectedRoute from './../auth/protected-route';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  else {

    return (
      <div className="wrapper">
        <h1>Welcome</h1>
          <AuthenticationButton />
          <BrowserRouter>
            <Switch>
              <ProtectedRoute path="/app">
                <Application />
              </ProtectedRoute>
              <ProtectedRoute path="/profile" component={Profile} />
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
