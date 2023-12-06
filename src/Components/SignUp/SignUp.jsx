import React, { useState } from "react";
import { auth } from "../FireBase/FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/signin");
    } catch (error) {

      const errorMsg = error.message.slice(9);
      setError(errorMsg);
    }
  };

  return (

    <>
    <div className="heading" >Welcome to News App</div>

    <div className="signUpContainer">
      <h1>Sign Up</h1>
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

        <button type="submit">Sign Up</button>
      </form>

      {error ? <p className="error" >*{error}</p> : null}

      <p>
        If already register 
        <Link to="/signin"> Sign In</Link>
      </p>
    </div>
    </>
  );
}
