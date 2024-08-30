import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <main>
        <div className="content">
          <span>best cuisine</span>
          <h1>Discover the World</h1>
          <p>
            You choose &amp; we will delivery world's best cuisines everyday at
            your doorstep.
          </p>
          <ol>
            <li>Tell us your taste</li>
            <li>Choose a Plan &amp; Subscribe</li>
            <li>Get Food Everyday</li>
            <li>No Worries! You can close anytime</li>
          </ol>
        </div>
        <div className="img-container">
          <img
            src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=806&q=80"
            alt=""
          />
          <div className="order">
            <div>
              <span>Your food box:</span>
              <div className="price">
                <span>$</span>
                <h2>250</h2>/month
              </div>
            </div>
            <hr />
            <div>
              <p>Delivered to you everyday</p>
              <Link to={"/login"}>
                <button> enroll now</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="about" style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1", padding: "20px", minHeight: "400px" }}>
          <p className="small">About Us</p>
          <h2>We've been making healthy food last for 10 years.</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
            esse dolorem velit quas porro. Quod, deleniti, blanditiis aut
            cupiditate esse earum molestias repellendus aperiam, a excepturi
            incidunt numquam maxime natus!
          </p>
        </div>
        <div
          style={{ flex: "1  480px", padding: "20px", alignItems: "center" }}
        >
          <img src="https://i.postimg.cc/mgpwzmx9/about-photo.jpg" alt="food" />
        </div>
      </div>
    </div>
  );
}
