const express = require('express');
const path = require('path');
const router = express.Router();
const { NODE_ENV } = process.env;

// GET verify API works
router.get('/', function (req, res, next) {
  res.send('test api response');
});

// GET api documentation
if (NODE_ENV === "development") {
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require(path.join('..', '..', 'swagger.json'));
  
  router.use('/apidocs', swaggerUi.serve);
  router.get('/apidocs', swaggerUi.setup(swaggerDocument));  
}

module.exports = router;
