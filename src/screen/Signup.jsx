import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
          email: formData.email,
          location: formData.location,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) { // Check if response status is not OK
        alert(data.message || "Something went wrong");
        return;
      }

      // Assuming `data` contains `token` if successful
      if (data.token) {
        navigate("/login");
      } else {
        alert("Registration failed");
      }

    } catch (err) {
      alert("An error occurred: " + err.message);
    }
  };

  return (
    <div className="main">
      <div className="container" id="container">
        <div className="form-container sign-in">
          <form onSubmit={submit}>
            <h2>Sign up</h2>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g" />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github" />
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in" />
              </a>
            </div>
            <span>Create a new account</span>
            <input
              type="text"
              placeholder="Username"
              name="name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Address"
              name="location"
              onChange={handleChange}
              required
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to order food</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
