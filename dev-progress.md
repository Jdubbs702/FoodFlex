# Development Progress - Week 1
(June 4-10, 2023)

## Setup Backend - June 5
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