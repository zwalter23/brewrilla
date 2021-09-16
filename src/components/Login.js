import React from "react";
import "./Login.css";

export const Login = ({ login, setPassword, setUserName }) => {
  return (
    <div className="login-wrapper">
      <h1>Login page</h1>
      <form>
        <label>
          <p>Username</p>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button
            onClick={() => {
              login();
            }}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
