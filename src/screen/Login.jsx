import React, { useState,  } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
  const navigate = useNavigate();
  // const [username, setUername] = useState('')
  const [Data , setData] = useState({
    email:'',
    password:""
  })
  const HandleChange = (e) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };

  const submit =async (e) => {
    e.preventDefault();
  const fetchData = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        password: Data.password,
        email: Data.email,
      
      }),
    })
    
      .then((res) => res.json())
      .catch((err) => alert(err));
     
       if(!fetchData.success){
        alert(fetchData.msg)
       }if(fetchData.success){
        
        localStorage.setItem("AuthToken",fetchData.token)
        localStorage.setItem("Username", fetchData.username); // Saving username
        localStorage.setItem("Useremail", Data.email); // Saving email
        navigate("/")
       }

    
  };

  return (<div className='main'>


    <div className="container" id="container">
  
  <div className="form-container sign-in">
    <form>
      <h1>Log In</h1>
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
      <span>or use your email password</span>
      <input type="email" placeholder="Email" name="email"
              onChange={HandleChange} />
      <input type="password" placeholder="Password"  name="password"
              onChange={HandleChange} />
      <a href="#">→ Forget Your Password? ←</a>
      <button onClick={submit}>
      
        Log In
        
        </button>
    </form>
  </div>
  <div className="toggle-container">
    <div className="toggle">
      
      <div className="toggle-panel toggle-right">
        <h1>Hello, Friend!</h1>
        <p>Register with your personal details to order food</p>
        <button className="hidden" id="register">
          <Link to={'/signup'}>
          Sign Up
          </Link>
        </button>
      </div>
    </div>
  </div>
</div>

  </div>
  )
}
