const { logger } = require('../logging/logger');
const ytdl = require('ytdl-core');
const path = require('path');
const fs = require('fs');

async function createNewVideo(link) {
  // Calls ytdl to get video info
  const videoInfo = await ytdl.getInfo(link);
  logger.debug({ videoInfo }, "Get video info given link");
  // Call ytdl to save video to file
  const filePath = path.join(__dirname, "videos", videoInfo.videoDetails.title + "__" + videoInfo.videoDetails.videoId + ".mp4");
  logger.debug({ filePath }, "Create file path using video title");
  ytdl(link, {
    format: "mp4"
  }).pipe(fs.createWriteStream(filePath, { flags: "a" }));
  // 
  logger.debug("ytdl-core video download complete");
  const newVideo = {
    title: videoInfo.videoDetails.title,
    uploader: videoInfo.videoDetails.author.name,
    date: new Date(),
    duration: videoInfo.videoDetails.lengthSeconds,
    link: link,
    localPath: filePath
  }
  return newVideo
}

module.exports = {
  createNewVideo
};