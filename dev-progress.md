**Tasks:** Keeping track of things to come back to:
  - [ ] Complete `server-architecture.md`
  - [ ] Complete `swagger.yaml`
    - reconcile request body responses with actual responses
    - provide better endpoint descriptions
  - [ ] Write input validations for *menu* and *order* post requests

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
- Created `user-auth` middleware
- Created user input validators
- Created dev progress markdown

## Backend Setup - June 8
- Created `menu.js` (in `routes` directory) w routes for client config and order placing
- Created `menu-controller.js` with apis for getting common menu options, setting the menu, and placing orders
- Created `client-menus.json` (in `config` directory) for storing client menu options (may change to remote db)

# Development Progress - Week 2
(June 11-17, 2023)

## Backend Setup - June 11
- Planned out Client Admin Configuration and Client User architectures
- Updates to Menu routes (still in progress)
- Created `orders.js` (in `models` directory) for db order model
- Created `orders.js` (in `routes` directory) for order route
- Created `order-controller.js` for creating new orders
- Created `email-controller.js`: handles user confirmation and admin notification emails

## Backend Setup - June 12
- Tested and de-bugged all endpoints and auth middleware
- Updated APIs in `order-controller.js`, and `email-controller.js`

## Backend Setup - June 13
- Started `server-architecture.md`

# Development Progress - Week 3
(June 18-24, 2023)

## Backend Setup - June 13
- Researched Swagger, OpenAPI Specification (OAS), and YAML
- Began writing FoodFlex API Documentation using OAS
- Organized `server-architecture.md` and `swagger.yaml` into `docs` directory