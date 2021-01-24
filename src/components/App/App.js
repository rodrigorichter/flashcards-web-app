import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Application from '../Application/Application';
import Login from '../Login/Login';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Welcome</h1>
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
