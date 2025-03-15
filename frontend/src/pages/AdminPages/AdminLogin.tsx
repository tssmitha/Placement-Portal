import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import './AdminLogin.css'; // Import the custom styles

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/admin/admin-login", {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("admin-token", token);
      history.push("/admin-dashboard");
    } catch (error) {
      setError("Invalid credentials or not an admin");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-form">
        <h1 className="login-heading">Admin Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>    
  );
};

export default AdminLogin;
