// Post.model.js
const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  uploader: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => {
        return v > 0 && typeof Number(v);
      },
      message: '{VALUE} is not an integer value'
    }
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  localPath: {
    type: String,
    required: true
  }
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;