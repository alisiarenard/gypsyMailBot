import buttons from "../../common/consts/buttons.const.js";

export const startAction = async (ctx: any) => {
    await ctx.reply("Привет! Этот бот помогает передавать посылки и документы. Выбери чего хочешь ты", buttons.MAIN_MENU);
}
