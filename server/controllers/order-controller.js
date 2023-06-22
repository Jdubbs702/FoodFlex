// Import necessary modules and models
const HttpError = require("../models/http-error");
const { getAdminEmailByClientName } = require("../controllers/users-controller");
const OrderModel = require("../models/orders");
const DB = require("../db");
const emailController = require("../controllers/email-controller");

const ordersDB = new DB(OrderModel);

// API endpoint for creating and processing an order
const createOrder = async (req, res, next) => {
  try {
    // Save the order to the database
    const newOrder = await ordersDB.add(req.body);
  // newOrder object might look like this:
  //   {
  //     "userEmail": "702leopold@gmail.com",
  //     "order": {
  //         "entrees": {
  //             "shawarma": {
  //                 "protein": "chicken",
  //                 "breadType": "lafa",
  //                 "breadVariety": "white",
  //                 "spreads": ["hummus", "schug"],
  //                 "vegetables": ["Israeli salad", "eggplant", "pickles"]
  //             },
  //             "falafel": {
  //                 "breadVariety": "whole wheat",
  //                 "spreads": ["hummus", "schug"],
  //                 "vegetables": ["salad", "eggplant", "pickles"]
  //             }
  //         }
  //         "sides": {
  //             "frenchFries": "large",
  //             "greenSalad": {
  //                 "vegetables": ["lettuce", "tomatoes", "onion", "peppers"],
  //                 "toppings": ["cheese", "seed & nut mix", "croutons"],
  //                 "dressing": "oil & balsamic"
  //             }
  //         },
  //         "drinks": {
  //             "soda": {
  //                 "selection": "Coke Zero",
  //                 "size": "large"
  //             },
  //             "water": {
  //                 "selection": "bottled",
  //                 "size": "1 liter"
  //             }
  //         },
  //         "sauces": ["mayo", "mustard", "ketchup"]
  //     }
  // }
    // Get adminEmail
    const adminEmail = await getAdminEmailByClientName(req.params.clientName);
    // Send an email to the user with the order details
    await emailController.sendOrderConfirmationEmail(newOrder);
    // Send an email to the client admin with the order details
    await emailController.sendOrderNotificationToAdmin(adminEmail.address, newOrder);

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
    } else {
      next(new HttpError("Order creation failed. Please try again later.", 500));
    }
  }
};

exports.createOrder = createOrder;
