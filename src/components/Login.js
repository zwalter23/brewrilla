import React from "react";
import "./Login.css";

export const Login = () => {
  return (
    <div className="login-wrapper">
      <h1>Login page</h1>
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
