const { logger } = require('../logging/logger');
const Video = require('../models/video.model');

/* GET all videos */
const getAllVideos = async () => {
  try {
    const result = await Video.find({}).lean();
    logger.debug(result);
    return {
      success: true,
      data: result
    };
  } catch (e) {
    logger.error(e.message);
    return {
      success: false,
      error: e.message
    };
  };
};

/* GET single video */
const getVideo = async (link) => {
  try {
    const result = await Video.findOne({ link: link }).lean();
    logger.debug(result);
    return {
      success: true,
      data: result
    };
  } catch (e) {
    logger.error(e.message);
    return {
      success: false,
      error: e.message
    };
  };
};

/* POST create new video */
const createVideo = async (link) => {
  try {
    const alreadyExists = await Video.exists({ "link": link });
    if (alreadyExists) {
      throw new Error('Video already exists');
    }
    // Call ytdl to save video to file
    const videoUtils = require('./video.utils');
    const newVideo = await videoUtils.createNewVideo(link);
    logger.debug({ newVideo }, "Initialized new video object");
    // Saves newVideo to MongoDB through Mongoose
    const result = await Video.create(newVideo);
    logger.debug({ result }, "Mongoose result from creating video");
    return {
      success: true,
      data: result
    };
  } catch (e) {
    logger.error({ e }, "ERROR in create video ");
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
    logger.debug(result);
    return {
      success: true,
      data: result
    };
  } catch (e) {
    logger.error(e.message);
    return {
      success: false,
      error: e
    };
  };
};

/* DELETE single video */
const deleteVideo = async (link) => {
  try {
    const result = await Video.findOneAndDelete({ link: link }).exec();
    logger.debug(result);
    return {
      success: true,
      data: result
    };
  } catch (e) {
    logger.error(e.message);
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