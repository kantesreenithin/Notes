const express = require("express");
const {
  signupUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

//signup route
router.post("/create-account", signupUser);
//login route
router.post("/login", loginUser);

const { authenticateToken } = require("../utilities");
router.use(authenticateToken);
//get user
router.get("/get-user", getUser);


module.exports = router;
