const Telegraf = require('telegraf')

const config = require('./conf/config');
const commands = require('./commands/index');

const db = require('./models/index');
const helpers = require('./helpers/index');

const bot = new Telegraf(config.TOKEN);
helpers.setupMongoose();

// Initialize wirking with db. From `./models` folder.
for (let item in db) {
    db[item](bot);
}

// Initialize telegram bot commands. From `./commands` folder.
for (let command in commands) {
    commands[command](bot);
}

bot.startPolling();