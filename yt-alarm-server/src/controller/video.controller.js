const ytdl = require('ytdl-core');
const path = require('path');
const fs = require('fs');
const Video = require('../models/video.model'); // post model

/* GET all videos */
const getAllVideos = () => {
  Video.find({}, function (err, result) {
    if (err) {
      return {
        success: false,
        error: err.message
      }
    }
    return {
      success: true,
      data: result
    }
  });
  console.log(result);
  return result;
};

/* GET single video */
const getVideo = async (post_id) => {
  const result = Video.findById(post_id, function (err, result) {
    if (err) {
      return {
        success: false,
        error: err.message
      };
    }
    return {
      success: true,
      data: result
    };
  });
  console.log(result);
  return result;
};

/* POST create new video */
const createVideo = async (link) => {
  let result;
  try {
    const videoInfo = await ytdl.getInfo(link);
    // Saves YT video to file
    const filePath = path.join(__dirname, "videos", videoInfo.videoDetails.title + "__" + videoInfo.videoDetails.videoId + ".mp4");
    ytdl(link, {
      format: "mp4"
    }).pipe(fs.createWriteStream(filePath, { flags: "a" }));
    const newVideo = {
      title: videoInfo.videoDetails.title,
      uploader: videoInfo.videoDetails.author,
      date: new Date(),
      duration: videoInfo.videoDetails.lengthSeconds,
      link: link,
      localPath: filePath
    }
    // Saves newVideo to MongoDB through Mongoose
    result = await Video.save(newVideo, function (err, result) {
      if (err) {
        return {
          success: false,
          error: err.message
        };
      }
      return {
        success: true,
        data: result
      };
    });
  } catch (e) {
    result = {
      success: false,
      error: e.message
    }
  }
  console.log(result);
  return result;
};

/* PUT update single video */
const updateVideo = (post_id, fieldsToUpdate) => {
  const result = Video.findByIdAndUpdate(req.params.post_id, { $set: fieldsToUpdate }, { new: true }, function (err, result) {
    if (err) {
      return {
        success: false,
        error: err.message
      };
    }
    return {
      success: true,
      data: result,
      message: "Post updated successfully"
    };
  });
  console.log(result);
  return result;
};

/* DELETE single video */
const deleteVideo = (post_id) => {
  const result = Video.findByIdAndDelete(req.params.post_id, function (err, result) {
    if (err) {
      return {
        success: false,
        error: err.message
      };
    }
    return {
      success: true
    };
  });
  console.log(result);
  return result;
};

module.exports = {
  getAllVideos,
  getVideo,
  updateVideo,
  createVideo,
  deleteVideo
};