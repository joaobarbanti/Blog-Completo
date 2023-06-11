const express = require("express");

const router = express.Router();

const Controllers = require("../controllers/AuthController");

const upload = require("../UserPictureControl/Userpicture");

router.post("/Register", upload.single("userpicture"), Controllers.Register);
router.post("/Login", Controllers.Login);
router.post("/Logout", Controllers.Logout);

module.exports = router;
