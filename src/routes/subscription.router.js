const { Router } = require("express");

const {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels
} = require("../controllers/subscription.controller");

const { verifyJWT } = require("../middlewares/auth.middleware");

const router = Router();

//subscribe or unsubscribe any channel
router.route("/channel/:channelId").post(verifyJWT, toggleSubscription);
//get the user who subscribe the user
router.route("/channel/:channelId").get(verifyJWT, getUserChannelSubscribers);
//get the channel that user is subscribing
router.route("/channel").get(verifyJWT, getSubscribedChannels);

module.exports = router;
