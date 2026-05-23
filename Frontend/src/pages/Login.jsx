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
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

    <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer font-semibold"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          If you don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>

      </form>
    </div>
  </div>
);
}

export default Login;