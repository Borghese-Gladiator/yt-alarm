'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const dotenv = require('dotenv');
dotenv.config();

// CONSTANTS
const { logger, contextMiddleware } = require('./logging/logger');
const videoController = require('./controller/video.controller');
const indexRouter = require('./routes/index');
const videosRouter = require('./routes/videos');
const PORT = process.env.PORT || 3000;

// APP
const app = express();

// Our DB Configuration
require('./db/database');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'views', 'public')));
app.use(contextMiddleware); // Attach a unique request ID to every log line

// ROUTES
app.use('/api', indexRouter);
app.use('/api/videos', videosRouter);


// PAGES
app.get('*', (req, res, next) => {
  logger.debug({ url: req.baseUrl + req.path, httpMethod: req.method }, 'Endpoint accessed');
  next();
})
app.get('/', async (req, res) => {
  // query database for video list
  const result = await videoController.getAllVideos();
  if (!result.success) {
    throw new Error(result.error)
  }

  // populate database
  if (result.data.length === 0) {
    require('./db/dbSeeder.js')
  }

  // Convert dates into string to display
  const parsedVideosList = result.data.map((video, idx) => {
    return {
      ...video,
      link: `https://www.youtube.com/watch?v=${video.link}`,
      dateString: video.date.toISOString().slice(0, 10).replace(/-/g, "")
    }
  });
  logger.debug({ parsedVideosList }, 'Parsed video list from library page');

  // Display page
  res.render('pages/library', {
    videosList: parsedVideosList,
    page_name: "home"
  });
});
app.get('/download', (req, res) => {
  res.render('pages/download', {
    page_name: "download"
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // log URL user tried to access
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  logger.info({ url: fullUrl, httpMethod: req.method }, 'Non-existent endpoint called by user');

  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', {
    err_status: err.status || 500,
    err_msg: err.message,
    page_name: "error"
  });
});

app.listen(PORT, () => {
  logger.info(`Example app listening at http://localhost:${PORT}`)
})
