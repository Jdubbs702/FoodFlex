const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menu-controller");
const checkAuth = require("../middleware/check-auth");

// gets specific client menu for the order page
router.get("/:clientName", menuController.getClientMenuOptions)

// returns all common menu options stored in db
router.get("/options", menuController.getCommonOptions)

// allows admin user to pass to menu config route
router.use(checkAuth)
// configures specific client menu 
router.post("/config/:clientName", menuController.configClientMenu)

module.exports = router;