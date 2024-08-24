const express = require("express");
const authRoutes = express.Router()
const {
  registerUser,
  loginUser
} = require("../controller/auth.controller");

const { validate } = require('../middleware/validate')
const { validateRegister, validateLogin } = require('../validation/auth.validation');

authRoutes.route("/").post(validate(validateRegister), registerUser);
authRoutes.post("/login", validate(validateLogin), loginUser);

module.exports = authRoutes;