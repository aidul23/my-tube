const { Router } = require("express");
const { toggleVideoLike } = require("../controllers/like.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = Router();
router.route("/videos/:videoId").post(verifyJWT, toggleVideoLike);

module.exports = router;