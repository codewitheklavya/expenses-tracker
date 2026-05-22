import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);
      console.log(response)

      // store token
      localStorage.setItem("token", response.data.token);

      alert("Login successful");
      
      navigate("/dashboard");


      console.log(response.data);
    } catch (error) {
      console.log(error);

      alert("Login failed");
    }
  };

    return (
  <div>
    <h1>Login</h1>

    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
      />

      <br />
      <br />

      <button type="submit">Login</button>

      <p>
        If you don't have an account?{" "}
        <Link to="/signup">Signup</Link>
      </p>
    </form>
  </div>
);
}

export default Login;