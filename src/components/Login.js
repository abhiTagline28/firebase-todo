import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      window.M.toast({
        html: `Welcome ${result.user.email}`,
        classes: "green",
      });
      navigate("/");
    } catch (err) {
      window.M.toast({ html: err.message, classes: "red" });
    }
  };

  return (
    <div className="center container" style={{ maxWidth: "500px" }}>
      <h3>Please Login!!</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn blue">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
