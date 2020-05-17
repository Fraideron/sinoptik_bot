const Sinoptik = require('../helpers/index').sinoptik;

const onMessage = (bot) => {
    bot.on('message', async (ctx) => {
        const city = ctx && 
                     ctx.update && 
                     ctx.update.message && 
                     ctx.update.message.text;

        const message = await ctx.reply('Генерируем описание...)');                                           
        const sinoptik = new Sinoptik(city);
        sinoptik.getDescription().then((weather) => {
            await ctx.deleteMessage(message.message_id);
        }).catch((err) => {
            await ctx.reply(weather || 'Не можем найти указаный город. Попробуйте, ещё раз...');
        })
      
    })
}
module.exports = onMessage;