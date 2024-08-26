import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartDispatch, useCartState } from "../ContextReducer";
import profile from "../assets/user.svg";
// import { useCartDispatch } from "../ContextReducer";

export default function Navbar() {
  const navi = useNavigate();
  const Data = useCartState();
  const username = localStorage.getItem("Username"); // Retrieve the username
  // console.log(username);

  const dispatch = useCartDispatch();

  console.log(Data);
  const logout = () => {
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("Useremail");
    localStorage.removeItem("Username");
    // localStorage.removeItem("cart")
    console.log(localStorage.getItem("Useremail"));
    console.log(localStorage.getItem("Userename"));
    
    dispatch({ type: "CLEAR" });
    navi("/login");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        zIndex: "1000",
        fontFamily: "Comfortaa",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid" style={{}}>
          <Link
            className="navbar-brand fs-3"
            to="/"
            style={{ fontWeight: "bold" }}
          >
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
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul
              className="navbar-nav me-auto"
              style={{
                marginLeft: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <li className="nav-item">
                <Link
                  className="nav-link active mt-3"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/fooditem"
                >
                  Food Items
                </Link>
              </li>
              {localStorage.getItem("AuthToken") ? (
                <Link
                  className="nav-link active fs-6 mt-3"
                  aria-current="page"
                  to="/myorder"
                >
                  {" "}
                  My Order
                </Link>
              ) : (
                ""
              )}
            </ul>
            <div
              className="d-flex"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              {!localStorage.getItem("AuthToken") ? (
                <div>
                  <Link
                    className="btn bg-white text-success mx-1  "
                    to={"/login"}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn bg-white text-success mx-1"
                    to={"/signup"}
                  >
                    SignUp
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      margin: "5px",
                    }}
                  >
                    {" "}
                    <img
                      src={profile}
                      alt=""
                      srcset=""
                      style={{ maxHeight: "25px", minHeight: "25px" }}
                    />{" "}
                    {username.toUpperCase()}
                  </Link>
                  <Link className="btn bg-white text-success mx-1" to={"/cart"}>
                    MyCart {""}
                    <span class="badge bg-danger">{Data.length}</span>
                  </Link>
                  <Link
                    className="btn bg-white text-danger mx-1"
                    onClick={logout}
                  >
                    LogoUT
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
