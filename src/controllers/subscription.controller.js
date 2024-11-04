const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const User = require("../models/user.model");
const Subscription = require("../models/subscription.model");
const mongoose = require("mongoose");

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user._id;

  if (userId.toString() === channelId) {
    throw new ApiError(400, "You cannot subscribe to your own channel");
  }

  const existingSubscription = await Subscription.findOne({
    subscriber: userId,
    channel: channelId,
  });

  if (existingSubscription) {
    await Subscription.findByIdAndDelete(existingSubscription._id);
    return res
      .status(200)
      .json(
        new ApiResponse(200, existingSubscription, "Unsubscribed successfully")
      );
  }

  await Subscription.create({
    subscriber: userId,
    channel: channelId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Subscribed successfully"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
});

module.exports = {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
};
