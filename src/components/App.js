import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Application from './Application';
import Loading from './Loading';
import Profile from './../views/Profile';
import ProtectedRoute from './../auth/protected-route';
import LandingPage from './LandingPage';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  else {

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {isAuthenticated ? <Redirect to="/app" /> : <LandingPage />}
            </Route>
            <ProtectedRoute path="/app" component={Application} />
            <ProtectedRoute path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
