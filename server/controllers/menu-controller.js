const HttpError = require("../models/http-error");

// Add client-specific identifiers to endpoints to distinguish between different clients
const CONFIG_FILE_PATH = "../config/client-menus.json";

// Load client configurations from file
let clientConfigurations = {};
if (fs.existsSync(CONFIG_FILE_PATH)) {
  const fileData = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
  clientConfigurations = JSON.parse(fileData);
}
// API endpoint for the client to configure their menu options
// The API needs to receive an object that looks like this:
// { "clientId": "abc123", "category": "bread", "options": ["sourdough", "whole wheat"]}
const configClientMenu = async (req, res) => {
  try {
    const { clientId, category, options } = req.body;

    if (!clientConfigurations[clientId]) {
      clientConfigurations[clientId] = {};
    }

    clientConfigurations[clientId][category] = options;
    // After one request, the clientConfigurations object would look like this:
    // {
    //   "abc123": {
    //     "bread": ["sourdough", "whole wheat"]
    //   }
    // }

    // Save the updated client configurations to the file
    fs.writeFileSync(
      CONFIG_FILE_PATH,
      JSON.stringify(clientConfigurations, null, 2)
    );

    res.json({ message: "Configuration saved successfully" });
  } catch (error) {
    throw new HttpError("Configuration save failed", 500);
  }
};

// API endpoint for the client to request menu options for building a sandwich
const getMenuById = (req, res) => {
  const clientId = req.query.clientId;

  if (clientId && clientConfigurations[clientId]) {
    const clientConfiguration = clientConfigurations[clientId];

    const menuOptions = {};
    for (const category in clientConfiguration) {
      if (menuOptionsDB[category]) {
        menuOptions[category] = menuOptionsDB[category].filter((option) =>
          clientConfiguration[category].includes(option)
        );
      }
    }

    res.json(menuOptions);
  } else {
    throw new HttpError("Invalid client identifier", 400);
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

exports.configClientMenu = configClientMenu;
exports.getMenuById = getMenuById;
