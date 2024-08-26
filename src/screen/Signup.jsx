import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setformData] = useState({
    name: "",
    password: "",
    email: "",
    location: "",
  });
  const navigate = useNavigate()

  const HandleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit =async (e) => {
    e.preventDefault();
  const fetchData = await fetch("http://localhost:4000/api/createuser", {
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
    })
      .then((res) => res.json())
      .catch((err) => alert(err));
       console.log(fetchData);
       if(!fetchData.success){
        alert(fetchData.error)
       }if(fetchData.success){
        navigate("/login")
       }

    
  };

  return (
    <div className="main">
      <div className="container" id="container">
        <div className="form-container sign-in">
          <form>
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
            <span>create new user here</span>
            <input
              type="text"
              placeholder="username"
              name="name"
              onChange={HandleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={HandleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={HandleChange}
            />
            <input
              type="text"
              placeholder="Adress"
              name="location"
              onChange={HandleChange}
            />

            <button onClick={submit}>Sign In</button>
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
