const express = require("express");
const router = express.Router();
const user = require("../model/User");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const bycpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "IWillBeHokageOneDay";

//cross
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your actual frontend URL
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(cors(corsOptions));

router.post(
  "/createuser",

  // Validation and sanitization middleware
  [
    body("name").isLength({ min: 3 }).withMessage("Name cannot be empty"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 6 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("location")
      .isLength({ min: 1 })
      .withMessage("Location cannot be empty"),
  ],

  async (req, res) => {
    const { name, password, email, location } = req.body;
    const salt = await bycpt.genSalt(10);
    const hasPass = await bycpt.hash(password, salt);

    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: "invaild input" });
      }

      // check is user aalready exist
      const existingUser = await user.findOne({ email: email });
      if (existingUser) {
        // User with the provided email already exists
        return res.status(409).json({
          success: false,
          error: "User with this email already exists",
        });
      }

      // Create a new user using the User model
      await user.create({
        name: name,
        password: hasPass,
        email: email,
        location: location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//login route
router.post(
  "/login",
  [
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 6 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
  ],
  async (req, res) => {
    const { password, email } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: "invaild input" });
      }

      // check is user already exist
      const User = await user.findOne({ email: email });
      //compare password
      const passCom = await bycpt.compare(password, User.password);
     

      //make jsonwebToken
      const data = {
        user: User.id,
      };
      const token = jwt.sign(data, secret);

      // User with the provided email already exists
      if (passCom) {
        return res.json({
          success: true,
          msg: "log in user",
          token: token,
         username : User.name
        });
      }

      return res.json({ msg: "user not found" });
    } catch (error) {
      res.json({ success: false, error: error });
    }
  }
);

module.exports = router;
