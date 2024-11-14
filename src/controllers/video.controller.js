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

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  // Step 1: Build aggregation pipeline for filtering, sorting, and pagination
  const pipeline = [];

  // Step 2: Add filtering by query and userId if provided
  if (query) {
    pipeline.push({
      $match: {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      },
    });
  }

  if (userId) {
    pipeline.push({
      $match: {
        owner: mongoose.Types.ObjectId(userId),
      },
    });
  }

  // Step 3: Sorting logic based on `sortBy` and `sortType`
  const sortOptions = {};
  sortOptions[sortBy] = sortType === "asc" ? 1 : -1;
  pipeline.push({ $sort: sortOptions });

  // Step 4: Pagination with `mongoose-aggregate-paginate-v2`
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const videos = await Video.aggregatePaginate(
    Video.aggregate(pipeline),
    options
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        videos: videos.docs,
        pagination: {
          totalDocs: videos.totalDocs,
          totalPages: videos.totalPages,
          page: videos.page,
          limit: videos.limit,
          hasNextPage: videos.hasNextPage,
          hasPrevPage: videos.hasPrevPage,
        },
      },
      "Videos retrieved successfully"
    )
  );
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(404, "video id is required");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description, thumbnail } = req.body;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!videoId) {
    throw new ApiError(404, "video id is required");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (video.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You can't delete the video");
  }

  await Video.findByIdAndDelete(videoId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "video deleted successfully!"));
});

module.exports = {
  publishAVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
};
