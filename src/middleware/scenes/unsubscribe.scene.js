const {Scenes, Markup} = require("telegraf");
const {getSubscriptionByChatId} = require("../../common/sequelize/getSubscriptionByChatId.sequelize");
const {unsubscribe} = require("../../common/sequelize/unsibscribe.sequelize");
const buttons = require('../../common/consts/buttons.const');
const {backToStart} = require("../../common/helpers/messages.helper");
const message = require('../../common/consts/messages.const');
const {getFrom, getTo} = require("../../common/helpers/validation.helper");

const unsubscribeScene = new Scenes.WizardScene(
    'unsubscribe',
    async (ctx) => {
        const chatId = String(ctx.message.from.id);
        getSubscriptionByChatId(chatId).then((data) => {
            if (data.length) {
                const btns = data.map((subscription) => `${subscription.from} -> ${subscription.to}`);

                btns.push(buttons.BACK);
                ctx.reply(message.DELETE_SUBSCRIPTION, Markup.keyboard(btns).oneTime().resize());
            } else {
                ctx.reply(message.NO_SUBSCRIPTIONS, buttons.MAIN_MENU);
                ctx.scene.leave();
            }
        });

        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message?.text === buttons.BACK) {
            await backToStart(ctx);
            return;
        }

        const chatId = String(ctx.message.from.id);
        const from = getFrom(ctx.message?.text, '->');
        const to = getTo(ctx.message?.text, '->');

        unsubscribe(chatId, from, to).then(() => {
            ctx.reply(`Подписка на маршрут ${from}, ${to} удалена`, buttons.MAIN_MENU);
        });
        await ctx.scene.leave();
    });

module.exports = {unsubscribeScene};