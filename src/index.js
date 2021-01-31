import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import './assets/fonts/SourceSansPro-Regular.ttf'
import './assets/fonts/SourceSansPro-SemiBold.ttf'
import './assets/fonts/SourceSansPro-Italic.ttf'
import './assets/fonts/Merriweather-Regular.ttf'
import './assets/fonts/Merriweather-Bold.ttf'
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
