const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const Video = require("../models/video.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;


  if (!title && !description) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if files were uploaded
  if (!req.files || !req.files.videoFile || !req.files.thumbnail) {
    console.log("Files received:", req.files); // Debugging: see what files are actually received
    throw new ApiError(400, "Both video and thumbnail files are required");
  }

  const videoPath = req.files?.videoFile[0]?.path;
  const thumbnailPath = req.files?.thumbnail[0]?.path;

  if (!videoPath) {
    throw new ApiError(400, "Video is required");
  }

  if (!thumbnailPath) {
    throw new ApiError(400, "Thumbnail is required");
  }

  let video, thumbnail;

  try {
    video = await uploadOnCloudinary(videoPath);
    thumbnail = await uploadOnCloudinary(thumbnailPath);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new ApiError(500, "Error uploading files to Cloudinary");
  }

  console.log(video);
  console.log(thumbnail);

  const newVideo = await Video.create({
    videoFile: video.url,
    thumbnail: thumbnail.url,
    title,
    duration: video.duration,
    description,
    owner: userId,
  });

  if (!newVideo) {
    throw new ApiError(500, "Something went wrong while uploading video");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newVideo, "video uploaded successfully"));
});

module.exports = { publishAVideo };
