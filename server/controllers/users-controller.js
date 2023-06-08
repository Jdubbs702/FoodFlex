const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/users");
const DB = require("../db");
const HttpError = require("../models/http-error");

const usersDB = new DB(UserModel);
const secretCode = "super_secret_dont_share";

//create
const userSignup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError("Invalid inputs", 422);
    }

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await usersDB.find({ email: email });
    if (existingUser) {
      throw new HttpError("Email already exists", 422);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const constructedUser = {
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    };
    const newUser = await usersDB.add(constructedUser);

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      secretCode,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user: newUser, token: token });
  } catch (error) {
    next(new HttpError("Signup failed. Please try again later.", 500));
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const identifiedUser = await usersDB.find({ email: email });
    if (!identifiedUser) {
      throw new HttpError("Credentials are incorrect", 403);
    }

    const isValidPassword = await bcrypt.compare(
      password,
      identifiedUser.password
    );
    if (!isValidPassword) {
      throw new HttpError("Credentials are incorrect", 403);
    }

    const token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      secretCode,
      { expiresIn: "1h" }
    );

    res.json({ user: identifiedUser, token: token });
  } catch (error) {
    next(new HttpError("Login failed. Please try again later.", 500));
  }
};

//read
const getUserById = async (req, res, next) => {
  try {
    const user = await usersDB.getById(req.params.userId);
    if (!user) {
      throw new HttpError("Could not find a user for the provided id", 404);
    }
    res.json({ user });
  } catch (error) {
    next(new HttpError("Failed to fetch user. Please try again later.", 500));
  }
};

//update
const updateUserById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const id = req.params.userId;
  const newItem = req.body;

  try {
    const existingUser = await usersDB.find({ email: newItem.email });

    if (existingUser && existingUser._id !== id) {
      throw new HttpError("Email is already in use", 422);
    }

    const docAndSave = await usersDB.update(id);
    if (!docAndSave) {
      throw new HttpError("Could not find a user for the provided id", 404);
    }

    const { doc, save } = docAndSave;
    doc.firstName = newItem.firstName;
    doc.lastName = newItem.lastName;
    doc.email = newItem.email;
    doc.password = newItem.password;

    save();

    res.json({ doc });
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    }
    next(new HttpError("Failed to update user. Please try again later.", 500));
  }
};

exports.userSignup = userSignup;
exports.userLogin = userLogin;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;