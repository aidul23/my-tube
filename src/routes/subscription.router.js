const { Router } = require("express");

const {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels
} = require("../controllers/subscription.controller");

const { verifyJWT } = require("../middlewares/auth.middleware");

const router = Router();

router.route("/channel/:channelId").post(verifyJWT, toggleSubscription);
router.route("/channel/:channelId").get(verifyJWT, getUserChannelSubscribers);
router.route("/channel").get(verifyJWT, getSubscribedChannels);

module.exports = router;
