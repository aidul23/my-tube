const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const Comment = require("../models/comment.model");

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { userId } = req.user._id;
  const { comment } = req.body;

  console.log(comment);
  

  if (!comment || comment.trim().length === 0) {
    throw new ApiError(400, "Comment must have content");
  }

  const newComment = await Comment.create({
    content: comment,
    video: videoId,
    owner: userId,
  });

  return res.status(201).json(new ApiResponse(201, newComment, "commented"));
});

module.exports = { addComment };
