const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const Like = require("../models/like.model");

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!videoId) {
    throw new ApiError(404, "Not a valid video or deleted");
  }

  const existingLike = await Like.findOne({ video: videoId, likedBy: userId });
  
  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Like removed from the video"));
  }

  const newLike = await Like.create({ video: videoId, likedBy: userId });

  if (!newLike) {
    throw new ApiError(500, "Something went wrong while liking the video");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newLike, "Video liked successfully"));
});

module.exports = { toggleVideoLike };
