import React from "react";
import { CgInstagram } from "react-icons/cg";
import { FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-center align-items-center p-2  border-top">
        <div className="col-md-4 d-flex align-items-center flex-row-reverse">
          <span className="text-muted">© 2024 GoFood, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex justify-content-start align-items-start">
          <li className="ms-3 mt-3">
            <CgInstagram />
          </li>
          <li className="ms-3">
            <FaTwitter />
          </li>
          <li className="ms-3">
            <FaFacebook />
          </li>
        </ul>
      </footer>
    </div>
  );
}
