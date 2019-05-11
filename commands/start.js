const start = (bot) => {

    bot.start((ctx) => {
        const name = ctx && 
                    ctx.update && 
                    ctx.update.message && 
                    ctx.update.message.from &&
                    ctx.update.message.from.first_name;                  
        ctx.reply(`Привет ${name}! Введите название города для получении описания погоды:`);
    })
  
}

module.exports = start;