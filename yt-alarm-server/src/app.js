'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const dotenv = require('dotenv');
dotenv.config();

// CONSTANTS
const PORT = process.env.PORT || 3000;
const videoController = require('./controller/video.controller');
const indexRouter = require('./routes/index');
const videosRouter = require('./routes/videos');

// APP
const app = express();

// Our DB Configuration
require('./database');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'views', 'public')));


// ROUTES
app.use('/api', indexRouter);
app.use('/api/videos', videosRouter);

// PAGES
app.get('/', function(req, res) {
  res.render('pages/index', {
    page_name: "home"
  });
});
app.get('/download', function(req, res) {
  res.render('pages/download', {
    page_name: "download"
  });
});
app.get('/library', async function(req, res) {
  const videosList = await videoController.getAllVideos();
  console.log("GET LIBRARY");
  console.log(videosList);
  const parsedVideosList = videosList.map((video, idx) => {
    return {
      ...video,
      link: `https://www.youtube.com/watch?v=${link}`,
      dateString: video.date.toISOString().slice(0,10).replace(/-/g,"")
    }
  });
  console.log(parsedVideosList);
  res.render('pages/library', {
    videosList: parsedVideosList,
    page_name: "library"
  });
});
app.post('/test', (req, res) => {
  res.json({requestBody: req.body})
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', {
    err_status: err.status || 500,
    err_msg: err.message,
    page_name: "error"
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
