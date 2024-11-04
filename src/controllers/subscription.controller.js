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

  // Check if channelId is provided
  if (!channelId) {
    throw new ApiError(400, "Channel ID is required");
  }

  const subscribers = await Subscription.find({ channel: channelId })
    .populate({
      path: "subscriber",
      select: "fullName username avatar", // Fields to include for each channel
    })
    .exec();

  const subscribersList = subscribers.map((sub) => sub.subscriber);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        channelId,
        subscribers: subscribersList,
      },
      "fetched successfully"
    )
  );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "No user");
  }

  const subscribedTo = await Subscription.find({ subscriber: userId })
    .populate({
      path: "channel",
      select: "fullName username avatar",
    })
    .exec();

    const channelList = subscribedTo.map((chan) => chan.channel);

  if (!channelList) {
    throw new ApiError(500, "Internal server error");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        userId,
        channel: channelList,
      },
      "fetched successfully"
    )
  );
});

module.exports = {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
};
