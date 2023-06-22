const express = require("express");

const userValidators = require("../validators/userValidators");
const usersController = require("../controllers/users-controller.js");
const userAuth = require("../middleware/user-auth");

const router = express.Router();

//users routes
router.post(
  "/signup",
  userValidators.signupValidator,
  usersController.userSignup
);

router.post(
  "/login",
  userValidators.loginUserValidator,
  usersController.userLogin
);

router.get("/adminEmail/:userId", usersController.getAdminEmailByClientName);

router.use(userAuth); //for logged in users

router.put(
  //protected to loggedIn user
  "/update/:userId",
  userValidators.updateUserValidator,
  usersController.updateUserById
);

module.exports = router;
