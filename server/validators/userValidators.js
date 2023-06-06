const { body } = require('express-validator');

// Common validation rules for multiple fields
const len = 6;

// Common validators
const firstNameValidator = body('firstName').notEmpty().withMessage('First name is required');
const lastNameValidator = body('lastName').notEmpty().withMessage('Last name is required');
const emailValidator = body('email').isEmail().withMessage('Invalid email format');
const passwordValidator = body('password').isLength({ min: len }).withMessage(`Password must be at least ${len} characters long`);

const signupValidator = [
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  body('repassword').isLength({ min: len }).withMessage(`Confirm password must be at least ${len} characters long`)
];

const updateUserValidator = [
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator
];

module.exports = {
  signupValidator,
  updateUserValidator
};
