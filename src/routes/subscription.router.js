const { Router } = require("express");

const {
  toggleSubscription,
} = require("../controllers/subscription.controller");

const { verifyJWT } = require("../middlewares/auth.middleware");

const router = Router();

router.route("/channel/:channelId").post(verifyJWT, toggleSubscription);

module.exports = router;
