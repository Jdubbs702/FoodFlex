const fs = require('fs');
const path = require("path");

const HttpError = require("../models/http-error");

// Add client-specific identifiers to endpoints to distinguish between different clients
const CONFIG_FILE_PATH = path.join(__dirname, "../config/client-menus.json");

// Load client configurations from file
let clientConfigurations = {};
if (fs.existsSync(CONFIG_FILE_PATH)) {
  const fileData = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
  clientConfigurations = JSON.parse(fileData);
}

// API endpoint for the client to configure their menu options
// The API needs to receive an array of category-option pairs that looks like this:
// [
//   {
//     "category": "bread",
//     "options": ["sourdough", "whole wheat"]
//   },
//   {
//     "category": "sauce",
//     "options": ["mayo", "mustard", "ketchup"]
//   },
// ]
const configClientMenu = async (req, res) => {
  const clientName = req.params.clientName; // abc123
  try {
    const configData = req.body;

    if (!clientConfigurations[clientName]) {
      clientConfigurations[clientName] = {};
    }

    // Update the client configurations with the provided options
    configData.forEach(({ category, options }) => {
      if (clientConfigurations[clientName][category]) {
        // Options already exist, update them by pushing the new options
        clientConfigurations[clientName][category].push(...options);
      } else {
        // Options don't exist, create a new array with the provided options
        clientConfigurations[clientName][category] = options;
      }
    });
    // After the request, the clientConfigurations object would look like this:
    // {
    //   "abc123": {
    //     "bread": ["sourdough", "whole wheat"],
    //     "sauce": ["mayo", "mustard", "ketchup"]
    //   }
    // }

    // Save the updated client configurations to the file
    fs.writeFileSync(
      CONFIG_FILE_PATH,
      JSON.stringify(clientConfigurations, null, 2)
    );

    res.json({ message: "Configuration saved successfully" });
  } catch (error) {
    console.error(error);

    throw new HttpError("Configuration save failed", 500);
  }
};

// API endpoint for the client to request menu options for building a sandwich
const getClientMenuOptions = (req, res) => {
  const clientName = req.params.clientName;

  if (clientName && clientConfigurations[clientName]) {
    const clientConfiguration = clientConfigurations[clientName];
    res.json(clientConfiguration);
  } else {
    throw new HttpError("Invalid client identifier", 400);
  }
};

const getCommonOptions = (req, res) => {
  try {
    res.json(menuOptionsDB)
  } catch (error) {
    throw new HttpError("Failed to get menu options", 500);
  }
};

const menuOptionsDB = {
  breadTypes: ["Baguette", "Pita", "Sliced"],
  breadVarieties: ["Sourdough", "Whole Wheat", "White", "Multigrain"],
  spreads: ["Hummus", "Tahini", "Garlic sauce", "Pesto", "Salsa"],
  condiments: ["Mayonnaise", "Mustard", "Ketchup", "BBQ sauce", "Hot sauce"],
  embellishments: [
    "Cheese",
    "Egg",
    "Bacon",
    "Avocado",
    "Lettuce",
    "Tomato",
    "Cucumber",
    "Onion",
  ],
  proteins: ["Grilled chicken", "Roast beef", "Turkey", "Tofu"],
  veggies: ["Bell peppers", "Mushrooms", "Spinach", "Pickles"],
  spices: ["Salt", "Pepper", "Oregano", "Paprika"],
  sides: ["French fries", "Side salad", "Sweet potato fries", "Chips"],
  beverages: ["Soft drinks", "Iced tea", "Lemonade", "Water"],
};

module.exports = {
  getCommonOptions,
  configClientMenu,
  getClientMenuOptions
};
