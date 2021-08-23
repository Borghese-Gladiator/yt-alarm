const express = require('express');
const router = express.Router();
const videoController = require('../controller/video.controller');

/* GET all videos */
router.get('/', async (req, res, next) => {
  const result = await videoController.getAllVideos();
  if (!result.success) {
    console.info(result);
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    success: true,
    data: result.data
  });
});

/* GET single video */
router.get("/:link", async (req, res, next) => {
  const link = req.params.link;
  const result = await videoController.getVideo(link);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    success: true,
    data: result.data
  });
});

/* POST create new video */
router.post("/", async (req, res, next) => {
  const link = req.params.link;
  const result = await videoController.createVideo(link);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    success: true,
    data: result.data
  });
});

/* PUT edit single video */
router.put("/:link", async (req, res, next) => {
  const link = req.params.link;
  const fieldsToUpdate = req.body;
  const result = await videoController.updateVideo(link, fieldsToUpdate);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    success: true,
    data: result.data
  });
});

/* DELETE single video */
router.delete("/:link", async (req, res, next) => {
  const link = req.params.link;
  const result = await videoController.deleteVideo(link);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    success: true,
    data: result.data
  });
});

module.exports = router;