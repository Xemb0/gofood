import React, { useState } from 'react';
import './login.css';
import { useCartDispatch } from "../ContextReducer";
import { Link, useNavigate } from 'react-router-dom';

// Function to parse JWT
const parseJwt = (token) => {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = atob(base64Url);
    return JSON.parse(decodeURIComponent(escape(base64)));
  } catch (e) {
    console.error('Failed to parse JWT:', e);
    return null;
  }
};

// Function to fetch cart data
const fetchCart = async (token, dispatch) => {
  try {
    if (!token) {
      throw new Error('No AuthToken found.');
    }

    const decodedToken = parseJwt(token);
    const userId = decodedToken ? decodedToken.user_id : null;

    if (!userId) {
      throw new Error('User ID not found in token.');
    }

    const response = await fetch(`http://localhost:4000/api/auth/cart/get/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart data.');
    }

    const result = await response.json();
    const cartItems = Array.isArray(result) ? result : [];

    console.log('Fetched cart items:', cartItems);

    // Dispatch each cart item to the context
    cartItems.forEach(item => {
      dispatch({
        type: 'ADD',
        id: item.id,
        name: item.name,
        description: item.description,
        img: item.img,
        qut: item.qut,
        size: item.size,
        price: item.price,
      });
    });

    localStorage.setItem('Cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useCartDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('AuthToken');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api/auth'}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      } else {
        localStorage.setItem('AuthToken', data.token);
        localStorage.setItem('Username', data.username || formData.email);
        localStorage.setItem('Useremail', formData.email);

        // Fetch the cart data after successful login
        await fetchCart(data.token, dispatch);
        navigate('/');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div className="container" id="container">
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
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
            <span>or use your email and password</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <a href="#">→ Forget Your Password? ←</a>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to order food</p>
              <button className="hidden" id="register">
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
