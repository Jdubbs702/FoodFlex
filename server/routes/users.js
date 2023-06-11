const express = require("express");

const userValidators = require("../validators/userValidators");
const usersController = require("../controllers/users-controller.js");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

//users routes
router.post(
  "/signup",
  userValidators.signupValidator,
  usersController.userSignup
);

router.post("/login", usersController.userLogin); //validation not needed(email and password are already being matched/compared)

router.get("/:userId", usersController.getUserById);

router.use(checkAuth); //for logged in users

router.put( //protected to loggedIn user
  "/:userId",
  userValidators.updateUserValidator,
  usersController.updateUserById
); 

module.exports = router;
