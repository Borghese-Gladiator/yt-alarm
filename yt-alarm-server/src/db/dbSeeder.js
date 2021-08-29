const { logger } = require('./logging/logger');
const fs = require('fs');
const path = require('path');
const Video = require('./models/video.model');

const videoList = [
  {
    "title": "Gura for an Alarm",
    "uploader": "Bakuretsu",
    "date": "2021-08-23T19:38:07.908Z",
    "duration": 44,
    "link": "53hfUpW0yGY",
    "localPath": "/usr/src/app/src/videos/Gura for an Alarm.mp3",
  },
  {
    "title": "[MV] The Grim Reaper is a Live-Streamer - Calliope Mori #HololiveEnglish #HoloMyth",
    "uploader": "Mori Calliope Ch. hololive-EN",
    "date": "2021-08-23T19:38:07.908Z",
    "duration": 190,
    "link": "Z5VxUvL_uBo",
    "localPath": "/usr/src/app/src/videos/[MV] The Grim Reaper is a Live-Streamer - Calliope Mori #HololiveEnglish #HoloMyths.mp3",
  },
  {
    "title": "【MV】春に揺られど君想う feat. こぴ _ コバソロ",
    "uploader": "kobasolo",
    "date": "2021-08-23T19:38:07.908Z",
    "duration": 253,
    "link": "kmPgjr0EL64",
    "localPath": "/usr/src/app/src/videos/【MV】春に揺られど君想う feat. こぴ _ コバソロ.mp3",
  }
]

Video.insertMany(videoList).then((videoList) => {
  logger.debug({ videoList }, "Default video list inserted");
}).catch((err) => {
  logger.error({ err }, "Default video list failed to insert");
})

copyFolderRecursiveSync('./seederFiles', '../videos')

function copyFileSync(source, target) {
  const targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  const files = [];

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}