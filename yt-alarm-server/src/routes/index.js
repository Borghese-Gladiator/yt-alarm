const express = require('express');
const path = require('path');
const router = express.Router();
const { NODE_ENV } = process.env;

// GET verify API works
router.get('/', function (req, res, next) {
  res.status(200).json({
    description: "CRUD videos on yt-alarm-server",
    name: "yt-alarm-server",
    version: "1.0.0"
  });
});

// GET api documentation
if (NODE_ENV === "development") {
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require(path.join('..', '..', 'swagger.json'));
  
  router.use('/apidocs', swaggerUi.serve);
  router.get('/apidocs', swaggerUi.setup(swaggerDocument));  
}

module.exports = router;
