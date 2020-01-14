const mongoose = require('mongoose')

// Schema
const Schema = mongoose.Schema
const messageSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      default: 0,
    },
    id: {
      type: String,
      required: true,
      default: 0,
    },
    message: {
        type: Number,
        required: true,
        default: 0,
      },
  },
  { timestamps: true }
)
const Message = mongoose.model('messages', messageSchema)

const saveMessage =  async (ctx) => {
  const lock = new Lock(1);
  lock.acquire();
  try {
    const today = dateToEpoch(new Date())
    let message = new Message();
    message.date = today;
    message.name = 'Test';
    message.id = '1232';    
    message.message = 'fdsffd';
    await message.save();
  } catch(e) {
    // Do nothing
    console.log(e);
    
  } finally {
    lock.release()
  }
}

const dateToEpoch = (date) => {
  return date.setHours(0, 0, 0, 0)
}

const messageSaver = (bot) => {
  bot.use((ctx, next) => {
    next();
    saveMessage(ctx);
  })
}

// Exports
module.exports = messageSaver;