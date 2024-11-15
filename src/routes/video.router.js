const { Router } = require("express");
const {
  publishAVideo,
  getAllVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
} = require("../controllers/video.controller");
const { upload } = require("../middlewares/multer.middleware");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = Router();

router.route("/upload-video").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.route("/videos").get(getAllVideos);

router.route("/videos/:videoId").get(getVideoById);

router.route("/videos/:videoId").delete(verifyJWT, deleteVideo);

router
  .route("/videos/:videoId")
  .patch(verifyJWT, upload.single("thumbnail"), updateVideo);

module.exports = router;
