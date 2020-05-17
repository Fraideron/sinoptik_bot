const mongoose = require('mongoose');
const {Lock} = require('semaphore-async-await');


// Schema
const Schema = mongoose.Schema;
const messageSchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
            index: true,
        },
        user: {
            type: Object,
            required: true,
            default: 0,
        },
        id: {
            type: String,
            required: true,
            default: 0,
        },
        message: {
            type: String,
            required: true,
            default: 0,
        },
    },
    {timestamps: true}
);

const Message = mongoose.model('messages', messageSchema);

const saveMessage = async (ctx) => {
    const lock = new Lock(1);
    await lock.acquire();
    try {
        let message = new Message();
        const data = {
            date: ctx.update.message.date || '',
            user: ctx.update.message.from,
            id: ctx.update.message.message_id,
            message: ctx.update.message.text || 'Message empty'
        };
        message = Object.assign(message, data);
        await message.save();
    } catch (e) {
        console.log(e);
    } finally {
        lock.release();
    }
};

const dateToEpoch = (date) => {
    return date.setHours(0, 0, 0, 0)
};

const messageSaver = (bot) => {
    bot.use((ctx, next) => {
        next();
        saveMessage(ctx);
    })
};

// Exports
module.exports = messageSaver;
