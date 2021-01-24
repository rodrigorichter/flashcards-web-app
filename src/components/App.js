import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Application from './Application';
import LoginButton from './LoginButton';

function App() {

  return (
    <div className="wrapper">
      <h1>Welcome</h1>
        <LoginButton />
        <BrowserRouter>
          <Switch>
            <Route path="/app">
              <Application />
            </Route>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
