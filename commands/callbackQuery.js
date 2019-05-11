const callbackQuery = (bot) => {
    bot.on('callback_query', (ctx) => {
        console.log(ctx.update);
    });
}

module.exports = callbackQuery;
