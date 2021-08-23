const ytdl = require('ytdl-core');
const path = require('path');
const fs = require('fs');
const Video = require('../models/video.model'); // post model

/* GET all videos */
const getAllVideos = async () => {
  try {
    const result = await Video.find({}).lean();
    console.info(result);
    return {
      success: true,
      data: result
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      error: e.message
    };
  };
};

/* GET single video */
const getVideo = async (link) => {
  try {
    const result = await Video.find({ link: link }).lean();
    console.info(result);
    return {
      success: true,
      data: result
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      error: e.message
    };
  };
};

/* POST create new video */
const createVideo = async (link) => {
  try {
    const alreadyExists = await Video.find({}).select({ "link": link });
    if (alreadyExists) {
      throw 'Video already exists'
    }
    // Calls ytdl to get video info
    const videoInfo = await ytdl.getInfo(link);
    // Call ytdl to save video to file
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
    const result = await Video.save(newVideo);  
    console.info(result)
    return {
      success: true,
      data: result
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      error: e.message
    };
  };
};

/* PUT update single video */
const updateVideo = async (link, fieldsToUpdate) => {
  try {
    const result = await Video.findOneAndUpdate({ link: link }, { $set: fieldsToUpdate });
    console.info(result);
    return {
      success: true,
      data: result
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      error: e.message
    };
  };
};

/* DELETE single video */
const deleteVideo = async (link) => {
  try {
    const result = await Video.findOneAndDelete({ link: link });
    console.info(result);
    return {
      success: true,
      data: result
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      error: e.message
    };
  };
};

module.exports = {
  getAllVideos,
  getVideo,
  updateVideo,
  createVideo,
  deleteVideo
};