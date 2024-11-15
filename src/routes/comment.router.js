const { Router } = require("express");
const { addComment } = require("../controllers/comment.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = Router();
router.route("/videos/comments/:videoId").post(verifyJWT, addComment);

module.exports = router;