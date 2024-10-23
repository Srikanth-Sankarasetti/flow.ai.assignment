const express = require("express");
const {
  getUsers,
  registerUser,
  userLogin,
  routeProtector,
} = require("./../controllers/authController");
const router = express.Router();

router.route("/").get(routeProtector, getUsers);
router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
module.exports = router;
