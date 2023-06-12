const { body } = require("express-validator");

// Common validation rules for multiple fields
const len = 6;

// Common validators
const clientNameValidator = body("clientName")
  .notEmpty()
  .withMessage("Client name is required");
const emailValidator = body("email")
  .isEmail()
  .withMessage("Invalid email format");
const passwordValidator = body("password")
  .isLength({ min: len })
  .withMessage(`Password must be at least ${len} characters long`);

const signupValidator = [
  clientNameValidator,
  emailValidator,
  passwordValidator,
  body("repassword")
    .isLength({ min: len })
    .withMessage(`Confirm password must be at least ${len} characters long`),
];

const loginUserValidator = [
  emailValidator,
  passwordValidator
];

const updateUserValidator = [
  clientNameValidator,
  emailValidator,
  passwordValidator
];

module.exports = {
  signupValidator,
  loginUserValidator,
  updateUserValidator,
};
