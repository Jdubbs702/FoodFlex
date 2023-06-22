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
const sendOrderConfirmationEmail = async ({userEmail, order}) => {
  const emailContent = composeText(order);
  try {
    // Compose the email
    const mailOptions = {
      from: adminEmail,
      to: userEmail,
      subject: "Order Confirmation",
      html: `Thank you for your order!<br><br>Order details:<br>${emailContent}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    throw new HttpError("Failed to send order confirmation email", 500);
  }
};

// Function to send an order notification to the client admin
const sendOrderNotificationToAdmin = async (adminEmail, {userEmail, order}) => {
  const emailContent = composeText(order);
  try {
    // Compose the email
    const mailOptions = {
      from: userEmail,
      to: adminEmail,
      subject: "New Order Notification",
      html: `You have received a new order!<br><br>Order details:<br>${emailContent}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send order notification email to admin:", error);
    throw new HttpError("Failed to send order notification email to admin", 500);
  }
};

const composeText = (order) => {
  let composedText = '';

  // Helper function to capitalize the first letter of a word
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  // Compose the sides section of the order
  const sides = order.sides;
  if (sides) {
    composedText += '<strong>Sides:</strong><br>';
    Object.entries(sides).forEach(([sideName, sideDetails]) => {
      if (typeof sideDetails === 'string') {
        composedText += `- ${capitalize(sideName)}: ${capitalize(sideDetails)}<br>`;
      } else if (typeof sideDetails === 'object') {
        composedText += `- ${capitalize(sideName)}:<br>`;
        composedText += `&nbsp;&nbsp;- Vegetables: ${sideDetails.vegetables.join(', ')}<br>`;
        composedText += `&nbsp;&nbsp;- Toppings: ${sideDetails.toppings.join(', ')}<br>`;
        composedText += `&nbsp;&nbsp;- Dressing: ${capitalize(sideDetails.dressing)}<br>`;
      }
    });
    composedText += '<br>';
  }

  // Compose the drinks section of the order
  if (order.drinks) {
    composedText += '<strong>Drinks:</strong><br>';
    const drinks = order.drinks;
    Object.entries(drinks).forEach(([drinkName, drinkDetails]) => {
      composedText += `- ${capitalize(drinkName)}: ${capitalize(drinkDetails.selection)}, ${capitalize(drinkDetails.size)}<br>`;
    });
    composedText += '<br>';
  }

  // Compose the entrees section of the order
  if (order.entrees) {
    composedText += '<strong>Entrees:</strong><br>';
    const entrees = order.entrees;
    Object.entries(entrees).forEach(([entreeName, entreeDetails]) => {
      composedText += `- ${capitalize(entreeName)}:<br>`;
      Object.entries(entreeDetails).forEach(([category, options]) => {
        if (Array.isArray(options)) {
          composedText += `&nbsp;&nbsp;- ${capitalize(category)}: ${options.map(capitalize).join(', ')}<br>`;
        } else if (typeof options === 'string') {
          composedText += `&nbsp;&nbsp;- ${capitalize(category)}: ${capitalize(options)}<br>`;
        }
      });
    });
  }

  return composedText;
};



module.exports = { sendOrderConfirmationEmail, sendOrderNotificationToAdmin };
