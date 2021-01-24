import React from 'react';
import './Login.css';

export default function Login() {
  return(
    <div className="login-wrapper">
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="Submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
