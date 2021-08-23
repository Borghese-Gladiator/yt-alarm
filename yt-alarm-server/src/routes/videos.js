const express = require('express');
const router = express.Router();
const videoController = require('../controller/video.controller');
const Video = require('../models/video.model');

/* GET all videos */
router.get('/', (req, res, next) => {
  const result = videoController.getAllVideos();
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    'success': true,
    'data': result.data
  });
});

/* GET single video */
router.get("/:link", (req, res, next) => {
  const link = req.params.link;
  const result = videoController.getVideo(link);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    'success': true,
    'data': result.data
  });
});

/* POST create new video */
router.post("/", async (req, res, next) => {
  const link = req.params.link;
  const result = videoController.createVideo(link);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    'success': true,
    'data': result.data
  });
});

/* PUT edit single video */
router.put("/:link", (req, res, next) => {
  const link = req.params.link;
  const fieldsToUpdate = req.body;
  const result = videoController.updateVideo(link, fieldsToUpdate);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    'success': true,
    'data': result.data
  });
});

/* DELETE single video */
router.delete("/:link", (req, res, next) => {
  const link = req.params.link;
  const result = videoController.deleteVideo(link);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  return res.status(200).json({
    'success': true,
    'data': result.data
  });
});

module.exports = router;