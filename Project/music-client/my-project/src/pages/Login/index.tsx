import React, { ChangeEvent, FormEvent, useState } from "react";
import logo from "../../images/logo.png";
import User from "../../types/user.type";
// import musicService from '../../apis/axios'
import { login } from "../../apis/services";
import { useNavigate } from "react-router-dom";
import SongList from "../musics/song.list";
import { Route, Routes } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState<User>({ username: "", password: "" });

  const { username, password } = user;
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const navigate = useNavigate();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    } catch (error) {
      console.error("Error in input change handler:", error);
      // Handle the error here, maybe set an error state or show a message to the user
    }
  };

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(user);
      console.log(response.data.accessToken);
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        setIsLoggedIn(true);
        setShowWelcome(true);

        setTimeout(() => {
          navigate("/music");
        }, 2000);
        setUser({ username: "", password: "" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
      setUser({ username: "", password: "" });
    }
  };

  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-center vh-100 py-4 bg-body-tertiary"
        style={{ background: `url(/music-client/src/images/img.webp)` }}
      >
        <div className="form-signin ">
          {showWelcome && (
            <div style={{ background: "orange", fontSize: "90px" }}>
              Welcome! Redirecting to Music...
            </div>
          )}
          <form onSubmit={loginHandler}>
            <img
              className="mb-4 bg-body-tertiary"
              src={logo}
              alt="MIU logo"
              style={{ width: "100px", marginLeft: "25%" }}
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating ">
              <input
                name="username"
                value={username}
                onChange={inputChangeHandler}
                className="form-control bg-body-tertiary"
                id="floatingInput"
                placeholder="username"
              />
              <label htmlFor="floatingInput">username</label>
            </div>
            <div className="form-floating mt-3">
              <input
                type="password"
                name="password"
                value={password}
                onChange={inputChangeHandler}
                className="form-control bg-body-tertiary"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button
              className="btn btn-primary btn-sm w-50 py-2 mt-3"
              style={{ marginLeft: "25%" }}
              type="submit"
            >
              Sign in
            </button>

            <div style={{ color: "red" }}>
              {error && "username or password Error"}
            </div>
          </form>
        </div>
      </div>
      <Routes></Routes>
    </div>
  );
}
