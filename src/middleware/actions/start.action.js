const buttons = require("../../common/consts/buttons.const");

exports.startAction = async (ctx) => {
    await ctx.reply("Привет! Этот бот помогает передавать посылки и документы. Выбери чего хочешь ты", buttons.MAIN_MENU);
}
