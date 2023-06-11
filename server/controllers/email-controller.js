const nodemailer = require("nodemailer");

const HttpError = require("../models/http-error");
const adminEmail = process.env.ADMIN_EMAIL_ACCOUNT
const emailPassword = process.env.ADMIN_EMAIL_PASSWORD

// nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: adminEmail,
    pass: emailPassword,
  },
});
// Function to send an order confirmation email to the user
const sendOrderConfirmationEmail = async (userEmail, order) => {
  try {
    // Compose the email
    const mailOptions = {
      from: adminEmail,
      to: userEmail,
      subject: "Order Confirmation",
      text: `Thank you for your order!\n\nOrder details:\n${order}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    throw new HttpError("Failed to send order confirmation email", 500);
  }
};

// Function to send an order notification to the client admin
const sendOrderNotificationToAdmin = async (userEmail, newOrder) => {
  try {
    // Compose the email
    const mailOptions = {
      from: userEmail,
      to: adminEmail,
      subject: "New Order Notification",
      text: `You have received a new order!\n\nOrder details:\n${JSON.stringify(
        newOrder,
        null,
        2
      )}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send order notification email to admin:", error);
    throw new HttpError("Failed to send order notification email to admin", 500);
  }
};

module.exports = { sendOrderConfirmationEmail, sendOrderNotificationToAdmin };
