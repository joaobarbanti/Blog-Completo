const express = require("express");

const router = express.Router();

const Controllers = require("../controllers/PostController");

const upload = require("../PostPictureControl/Postpicture");

router.get("/posts", Controllers.GetAllPosts);
router.get("/post/:id", Controllers.GetSpecificPost);
router.post("/Publish", upload.single("postpicture"), Controllers.MakePost);
router.delete("/post/:id", Controllers.DeletePost);
router.put("/post/:id", upload.single("postpicture"), Controllers.UpdatePost);
router.post("/comment/:id", Controllers.MakeComment)
router.get("/post/:id/comments/", Controllers.GetComments)

module.exports = router;
