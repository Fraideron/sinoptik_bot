const Telegraf = require('telegraf')

const config = require('./conf/config');
const commands = require('./commands/index');

const db = require('./models/index');
const helpers = require('./helpers/index');

const bot = new Telegraf(config.TOKEN);
helpers.setupMongoose();

db.setupCounter(bot);

commands.start(bot);
commands.onMessage(bot);



bot.startPolling()