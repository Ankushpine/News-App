import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../FireBase/FireBase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {

      const errorMsg = error.message.slice(9);
      setError(errorMsg);
    }
  };

  return (

    <>

    <div className="heading" >Welcome to News App</div>

    <div className="signUpContainer" >
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      {error ? <p className="error">*{error}</p> : null}
      <p>
        If not registered
        <Link to="/signup"> Sign Up</Link>
      </p>
    </div>

    </>
  );
}
