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
  entrees: [
    {
      name: "Shawarma",
      description: "Tender slices of marinated beef or chicken with choice of vegetables and spreads, served in pita bread or lafa."
    },
    {
      name: "Kebab",
      description: "Grilled skewers of seasoned ground beef or lamb with choice of vegetables and spreads, served in pita bread or lafa."
    },
    {
      name: "Falafel",
      description: "Falafel balls with choice of vegetables and spreads, served in pita."
    },
    {
      name: "Classic Burger",
      description: "Juicy beef patty with lettuce, tomato, onion, and your choice of condiments, served on a bun."
    },
    {
      name: "Cheeseburger",
      description: "Classic burger topped with melted cheese."
    },
    {
      name: "Veggie Burger",
      description: "Plant-based patty with lettuce, tomato, onion, and your choice of condiments, served on a bun."
    },
    {
      name: "Sweet and Sour Chicken",
      description: "Crispy chicken pieces coated in a tangy sweet and sour sauce, served with steamed rice."
    },
    {
      name: "Kung Pao Chicken",
      description: "Stir-fried chicken with peanuts, vegetables, and a spicy Kung Pao sauce, served with steamed rice."
    },
    {
      name: "General Tso's Tofu",
      description: "Crispy tofu tossed in a savory and sweet General Tso's sauce, served with steamed rice."
    },
    {
      name: "Pastrami Sandwich",
      description: "Thinly sliced pastrami piled high on rye bread with mustard and pickles."
    },
    {
      name: "Reuben",
      description: "Grilled sandwich with corned beef, sauerkraut, Swiss cheese, and Russian dressing on rye bread."
    },
    {
      name: "Turkey Club",
      description: "Triple-decker sandwich with roasted turkey, bacon, lettuce, tomato, and mayonnaise on toasted bread."
    }
  ],
  sides: [
    {
      greenSalad: {           
        vegetables: ["Lettuce", "Tomato", "Onion", "Peppers"],
        toppings: ["cheese", "seed & nut mix", "croutons"],
        dressing: "oil & balsamic"
      }
    }, "French fries", "Sweet potato fries", "Chips", "Egg Rolls", "Steamed Rice"
  ],
  breadTypes: ["Baguette", "Pita", "Sliced", "Lafa"],
  breadVarieties: ["Sourdough", "Whole Wheat", "White", "Multigrain"],
  spreads: ["Hummus", "Tahini", "Garlic sauce", "Pesto", "Sun-dried tomato spread"],
  condiments: ["Mayonnaise", "Mustard", "Ketchup", "BBQ sauce", "Hot sauce", "Salsa"],
  embellishments: ["Cheese", "Egg", "Bacon"],
  proteins: ["Grilled chicken", "Roast beef", "Turkey", "Tofu", "Lamb", "Roasted chicken", "Ground Beef"],
  veggies: ["Bell peppers", "Mushrooms", "Spinach", "Pickles", "Avocado", "Lettuce", "Tomato", "Cucumber", "Onion", "Hot peppers"],
  bevarages: {
    sodas: {
      flavors: ["Coca-Cola", "Coke Zero", "Sprite", "Fanta"],
      sizes: ["Small", "Medium", "Large"]
    },
    beers: ["Goldstar", "Heineken", "Corona", "Bud Light", "Guiness"],
    drinks: ["Water", "Ice Tea", "Limonana"]
  },
};

module.exports = {
  getCommonOptions,
  configClientMenu,
  getClientMenuOptions
};
