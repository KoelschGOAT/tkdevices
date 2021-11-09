import React, { useState, useEffect } from "react";
import Link,{Router} from "react-router-dom";
const Login = () => {
  document.title = `Login`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.replace("http://localhost:8000/devices");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8000/api/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data["token"]) {
          localStorage.clear();
          localStorage.setItem("token", data["token"]);
          setIsLoggedIn(true);
          window.location.replace("http://localhost:8000/devices");
        } else {
          setIsLoggedIn(false);
          setUsername("");
          setPassword("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <>
      {loading === false && (
        <div className="wrapper">
          <form className="login" onSubmit={onSubmit}>
            <p className="title">Log in</p>
            <input
              type="text"
              placeholder="Username"
              autoFocus
              name="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="fa fa-user"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fa fa-key"></i>

            <button input type="submit" value="Login">
              <i className="spinner"></i>
              <span className="state">Log in</span>
            </button>
          </form>
         
        </div>
      )}
    </>
  );
};

export default Login;
