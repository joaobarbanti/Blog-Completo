const express = require("express");
const router = express.Router();
const Controller = require("../controllers/UserController");

router.get("/users", Controller.GetAllUsers);
router.get("/user/:id", Controller.GetSpecificUserInformations);
router.get("/profile", Controller.GetProfileInformation);

module.exports = router;
