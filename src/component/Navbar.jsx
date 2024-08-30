import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartDispatch, useCartState } from "../ContextReducer";
import profile from "../assets/user.svg";

const parseJwt = (token) => {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(
      atob(base64Url).split('').map((c) =>
        `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
      ).join('')
    );
    return JSON.parse(base64);
  } catch (e) {
    console.error('Failed to parse JWT:', e);
    return null;
  }
};

export default function Navbar() {
  const navi = useNavigate();
  const cartData = useCartState();
  const username = localStorage.getItem("Username");
  const dispatch = useCartDispatch();

  const handleClearCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/cart/clearall/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Cart cleared:', data);
        return true; // Indicate success
      } else {
        console.error('Error clearing cart:', data.message);
        return false; // Indicate failure
      }
    } catch (error) {
      console.error('Network error:', error);
      return false; // Indicate failure
    }
  };

  const sendCartDataToBackend = async (item) => {
    const token = localStorage.getItem("AuthToken");
    
    if (!token) {
      console.error("No AuthToken found. Please log in.");
      return;
    }
    
    try {
      const decodedToken = parseJwt(token);
      const userId = decodedToken ? decodedToken.user_id : null;
      
      if (!userId) {
        throw new Error("User ID not found in token.");
      }

      // Prepare the data to be sent to the backend
      const bodyData = {
        userId,
        itemId: item.id,
        name: item.name,
        img: item.img,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      };
      
      console.log("Sending item data to backend:", bodyData); // Log the data being sent

      const response = await fetch('http://localhost:4000/api/auth/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Item data saved successfully:', result);
    } catch (error) {
      console.error('Error saving item data:', error);
    }
  };

  const logout = async () => {
    try {
      console.log("Starting logout process...");
  
      const token = localStorage.getItem("AuthToken");
      if (!token) {
        console.error("No AuthToken found. Cannot proceed with logout.");
        return;
      }
  
      const decodedToken = parseJwt(token);
      const userId = decodedToken ? decodedToken.user_id : null;
  
      if (!userId) {
        console.error("User ID not found in token.");
        return;
      }
  
      // Clear the backend cart
      // console.log("Clearing cart on the backend...");
      // const isCleared = await handleClearCart(userId);
      // if (!isCleared) {
      //   console.error("Failed to clear the cart.");
      //   return;
      // }aqqaqa1q
  
      // Re-add all items from the local cart to the backend
      console.log("Sending cart data to the backend...");
      for (const item of cartData) {
        try {
          await sendCartDataToBackend(item);
        } catch (err) {
          console.error(`Failed to send item ${item.id}:`, err);
          // Optionally break or continue based on requirement
        }
      }
  
      // Clear local storage and dispatch cart clear action
      console.log("Clearing local storage and dispatching cart clear action...");
      localStorage.removeItem("AuthToken");
      localStorage.removeItem("Useremail");
      localStorage.removeItem("Username");
      dispatch({ type: "CLEAR" });
  
      // Redirect to login page
      console.log("Redirecting to login page...");
      navi("/login");
  
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
    <div style={{ position: "sticky", top: "0", zIndex: "1000", fontFamily: "Comfortaa" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3" to="/" style={{ fontWeight: "bold" }}>
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto" style={{ marginLeft: "8px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <li className="nav-item">
                <Link className="nav-link active mt-3" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/fooditem">
                  Food Items
                </Link>
              </li>
              {localStorage.getItem("AuthToken") ? (
                <Link className="nav-link active fs-6 mt-3" aria-current="page" to="/myorder">
                  My Order
                </Link>
              ) : (
                ""
              )}
            </ul>
            <div className="d-flex" style={{ alignItems: "center", justifyContent: "center" }}>
              {!localStorage.getItem("AuthToken") ? (
                <div>
                  <Link className="btn bg-white text-success mx-1" to={"/login"}>
                    Login
                  </Link>
                  <Link className="btn bg-white text-success mx-1" to={"/signup"}>
                    SignUp
                  </Link>
                </div>
              ) : (
                <div>
                  <Link style={{ textDecoration: "none", color: "#fff", margin: "5px" }}>
                    <img src={profile} alt="Profile" style={{ maxHeight: "25px", minHeight: "25px" }} />
                    {username.toUpperCase()}
                  </Link>
                  <Link className="btn bg-white text-success mx-1" to={"/cart"}>
                    MyCart {""}
                    <span className="badge bg-danger">{cartData.length}</span>
                  </Link>
                  <Link className="btn bg-white text-danger mx-1" onClick={logout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
