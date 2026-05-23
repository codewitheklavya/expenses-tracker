import { useState } from "react";
import API from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

    function Signup() {
        const navigate =  useNavigate();
        const [formData, setFormData] = useState({
        name: "",
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

        console.log("button clicked")
        const response = await API.post("/auth/signup", formData);

        console.log(response.data);

        setFormData({
            name: "",
            email: "",
            password: "",
        });

        alert("Signup successful");
        navigate('/dashboard');

        } catch (error) {
        console.log(error.response);

        alert("Signup failed");
        
        }
    };

    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Signup
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer font-semibold"
        >
          Signup
        </button>

      </form>
    </div>
  </div>
);
    }

    export default Signup;