import { useState } from "react";
import API from "../services/api";

function Signup() {
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

      alert("Signup successful");
    } catch (error) {
      console.log(error.response);

      alert("Signup failed");
      
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />

        <br />
        <br />

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

        <button type="submit" className="cursor-pointer">Signup</button>
      </form>
    </div>
  );
}

export default Signup;