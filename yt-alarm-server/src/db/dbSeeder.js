const { logger } = require('./logging/logger');
const Video = require('./models/video.model');

const videoList = [
  {
    "title": "Falling Down - Not Economically Viable (1080p)",
    "uploader": "JackBauer137",
    "date": "2021-08-23T19:38:07.908Z",
    "duration": 114,
    "link": "T_17vRAsbOs",
    "localPath": "/usr/src/app/src/videos/Falling Down - Not Economically Viable (1080p)__T_17vRAsbOs.mp4",
  },
  {
    "title": "Falling Down - Not Economically Viable (1080p)",
    "uploader": "JackBauer137",
    "date": "2021-08-23T19:38:07.908Z",
    "duration": 114,
    "link": "T_17vRAsbOs",
    "localPath": "/usr/src/app/src/videos/Falling Down - Not Economically Viable (1080p)__T_17vRAsbOs.mp4",
  },
  {
    "title": "Falling Down - Not Economically Viable (1080p)",
    "uploader": "JackBauer137",
    "date": "2021-08-23T19:38:07.908Z",
    "duration": 114,
    "link": "T_17vRAsbOs",
    "localPath": "/usr/src/app/src/videos/Falling Down - Not Economically Viable (1080p)__T_17vRAsbOs.mp4",
  },
  {
    "title": "Falling Down - Not Economically Viable (1080p)",
    "uploader": "JackBauer137",
    "date": "2021-08-23T19:38:07.908Z",
    "duration": 114,
    "link": "T_17vRAsbOs",
    "localPath": "/usr/src/app/src/videos/Falling Down - Not Economically Viable (1080p)__T_17vRAsbOs.mp4",
  },
  {
    "title": "Falling Down - Not Economically Viable (1080p)",
    "uploader": "JackBauer137",
    "date": "2021-08-23T19:38:07.908Z",
    "duration": 114,
    "link": "T_17vRAsbOs",
    "localPath": "/usr/src/app/src/videos/Falling Down - Not Economically Viable (1080p)__T_17vRAsbOs.mp4",
  },
]

Video.insertMany(videoList).then((videoList) => {
  logger.debug({ videoList }, "Default video list inserted");
}).catch((err) => {
  logger.error({ err }, "Default video list failed to insert");
})