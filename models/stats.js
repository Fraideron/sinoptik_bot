const mongoose = require('mongoose')
const { Lock } = require('semaphore-async-await')

// Schema
const Schema = mongoose.Schema
const messageStatsSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
)
const MessageStats = mongoose.model('messageStats', messageStatsSchema)

const countMessage =  async () => {
  
  const lock = new Lock(1);
  lock.acquire();
  try {

    const today = dateToEpoch(new Date());
    let messageStats = await MessageStats.findOne({ date: today });
    if (!messageStats) {
      messageStats = new MessageStats();
      messageStats.count = 0;
      messageStats.date = today;
      console.log('messs11');

    }

    messageStats.count = messageStats.count + 1;
    await messageStats.save();
  } catch(e) {
    // Do nothing
    console.log(e);
    console.log('eeeee');
    
  } finally {
    lock.release();
  }
}

const dateToEpoch = (date) => {
  return date.setHours(0, 0, 0, 0)
}

const setupCounter = (bot) => {
  bot.use((ctx, next) => {    
    next();
    countMessage();
  })
}

// Exports
module.exports = setupCounter;