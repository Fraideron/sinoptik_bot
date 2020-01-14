// Dependencies
const mongoose = require('mongoose');
const config = require('../conf/config');

/**
 * Setting up mongoose
 */
const setupMongoose = () => {
  // Setup bluebird as a promise engine
  mongoose.Promise = global.Promise
  // Connect to the db
  mongoose.connect(config.MONGO_URL, {
    // DB gets huge, so setting up custom timeouts
    useNewUrlParser: true,
    socketTimeoutMS: 10000,
    connectTimeoutMS: 50000,
    useUnifiedTopology: true,
    useCreateIndex: true  
  })

  mongoose.connection.on('connected', () => {
    console.log('MongoDB: started\n')
  })

  // Reconnect on disconnect
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(process.env.MONGO_URL, {
      // DB gets huge, so setting up custom timeouts
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    })
  })
}

// Exports
module.exports = setupMongoose;