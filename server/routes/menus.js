const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menu-controller");
const userAuth = require("../middleware/user-auth");

// gets specific client menu for the order page
router.get("/client/:clientName", menuController.getClientMenuOptions)

// returns all common menu options stored in db
router.get("/config/options", menuController.getCommonOptions)

// allows admin user to pass to menu config route
router.use(userAuth)
// configures specific client menu 
router.post("/config/:clientName", menuController.configClientMenu)

module.exports = router;