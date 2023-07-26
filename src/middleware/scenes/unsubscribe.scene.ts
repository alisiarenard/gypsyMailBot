import {Scenes, Markup} from "telegraf";
import {getSubscriptionByChatId} from "../../common/sequelize/getSubscriptionByChatId.sequelize.js";
import {unsubscribe} from "../../common/sequelize/unsibscribe.sequelize.js";
import buttons from '../../common/consts/buttons.const.js';
import {backToStart} from "../../common/helpers/messages.helper.js";
import message from '../../common/consts/messages.const.js';
import {getFrom, getTo} from "../../common/helpers/validation.helper.js";

export const unsubscribeScene = new Scenes.WizardScene(
    'unsubscribe',
    async (ctx: any) => {
        const chatId = String(ctx.message?.from.id);
        getSubscriptionByChatId(chatId).then((data) => {
            if (data.length) {
                const btns = data.map((subscription: any) => `${subscription.from} -> ${subscription.to}`);

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

        const chatId = String(ctx.message?.from.id);
        const from = getFrom(ctx.message?.text, '->');
        const to = getTo(ctx.message?.text, '->');

        unsubscribe(chatId, from, to).then(() => {
            ctx.reply(`Подписка на маршрут ${from}, ${to} удалена`, buttons.MAIN_MENU);
        });
        await ctx.scene.leave();
    });