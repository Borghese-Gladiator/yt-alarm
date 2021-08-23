const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const Video = require('../models/video.model'); // post model

/* GET all videos */
router.get('/', (req, res, next) => {
  Video.find({}, function (err, result) {
    if (err) {
      return res.status(400).json({
        'success': false,
        'error': err.message
      });
    }
    return res.status(200).json({
      'success': true,
      'data': result
    });
  });
});

/* GET single video */
router.get("/:post_id", (req, res, next) => {
  Video.findById(req.params.post_id, function (err, result) {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    return res.status(200).json({
      success: true,
      data: result
    });
  });
});


/* POST create new video */
router.post("/", async (req, res, next) => {
  const link = req.body.link;
  try {
    const videoInfo = await ytdl.getInfo(link);
    // Saves YT video to file
    const filePath = path.join(__dirname, "..", "videos", videoInfo.videoDetails.title + "__" + videoInfo.videoDetails.videoId + ".mp4");
    ytdl(link, {
      format: "mp4"
    }).pipe(fs.createWriteStream(filePath, { flags: "a" }));
    const newVideo = {
      title: videoInfo.videoDetails.title,
      uploader: videoInfo.videoDetails.author.name,
      date: new Date(),
      duration: videoInfo.videoDetails.lengthSeconds,
      link: videoInfo.videoDetails.videoId,
      localPath: filePath
    }
    console.log(newVideo);
    // Saves newVideo to MongoDB through Mongoose
    Video.create(newVideo, function (err, result) {
      if (err) {
        console.log(err)
        return res.status(400).json({
          success: false,
          error: err.message
        });
      }
      return res.status(201).json({
        success: true,
        data: result,
        message: "POST video created successfully"
      });
    });
  } catch(e) {
    return res.status(400).json({
      success: false,
      error: e.message
    });
  }
});

/* PUT edit single video */
router.put("/:post_id", (req, res, next) => {
  let fieldsToUpdate = req.body;
  Video.findByIdAndUpdate(req.params.post_id, { $set: fieldsToUpdate }, { new: true }, function (err, result) {
    if (err) {
      res.status(400).json({
        success: false,
        error: err.message
      });
    }
    res.status(200).json({
      success: true,
      data: result,
      message: "Post updated successfully"
    });
  });
});

/* DELETE single video */
router.delete("/:post_id", (req, res, next) => {
  Video.findByIdAndDelete(req.params.post_id, function (err, result) {
    if (err) {
      res.status(400).json({
        success: false,
        error: err.message
      });
    }
    res.status(200).json({
      success: true,
      data: result,
      message: "Post deleted successfully"
    });
  });
});

module.exports = router;