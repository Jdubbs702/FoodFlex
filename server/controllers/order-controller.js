// Import necessary modules and models
const HttpError = require("../models/http-error");
const {
  getAdminEmailByClientName,
} = require("../controllers/users-controller");
const OrderModel = require("../models/orders");
const DB = require("../db");
const emailController = require("../controllers/email-controller");

const ordersDB = new DB(OrderModel);

// API endpoint for creating and processing an order
const createOrder = async (req, res, next) => {
  try {
    // Get adminEmail
    const adminEmail = getAdminEmailByClientName(req.params.clientName);
    // Extract order details from the request body
    const { userEmail, order } = req.body;
    const constructedOrder = {
      userEmail,
      order,
    };
    // Save the order to the database
    const newOrder = await ordersDB.add(constructedOrder);

    // Send an email to the user with the order details
    await emailController.sendOrderConfirmationEmail(userEmail, order);

    // Send an email to the client admin with the order details
    await emailController.sendOrderNotificationToAdmin(adminEmail, newOrder);

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    next(new HttpError("Order creation failed. Please try again later.", 500));
  }
};

exports.createOrder = createOrder;
