# Development Progress - Week 1
(June 4-10, 2023)

## Backend Setup - June 5
- Created Git repo with readme and gitignore, then cloned into FoodFlex directory
- Initialized npm 
- Created `server` directory and added: `express.js`, `Dockerfile`, `.dockerignore`, `.env`
- Installed dependencies
- Created `DB` class to define DB functions with error handling
- Created `Http-Error` class (in `models` directory) for custom error handling
- Created `users` schema, controller, and routes for signup, login, getUser, and updateUser
- Created `check-auth` middleware
- Created user input validators
- Created dev progress markdown

# Development Progress - Week 2
(June 11-17, 2023)

## Backend Setup - June 11
- Planned out Client Admin Configuration and Client User architectures
- Updates to Menu routes (still in progress)
- Created `orders.js` (in `models` directory) for db order model
- Created `orders.js`(in `routes` directory) for order route
- Created `order-controller.js` for creating new orders
- Created `email-controller.js`: handles user confirmation and admin notification emails
  