const mongoose = require('mongoose');

// Mongoose options
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0
};

// MongoDB environment variables
const {
  MONGO_HOSTNAME,
  MONGO_DB,
  MONGO_PORT,
  NODE_ENV
} = process.env;

const dbConnectionURL = {
  'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`,
  'CLOUDURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
};
if (NODE_ENV == "development") {
  mongoose.connect(dbConnectionURL.LOCALURL, options);
} else {
  mongoose.connect(dbConnectionURL.CLOUDURL, options);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));
db.once('open', () => {
  console.log('Mongodb Connection Successful');
});