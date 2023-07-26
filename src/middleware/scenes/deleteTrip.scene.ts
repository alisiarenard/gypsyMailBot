import {Scenes, Markup} from "telegraf";
import moment from "moment/moment.js";
import {getTripByChatId} from '../../common/sequelize/getTripByChatId.sequilize.js';
import {deleteTrip} from '../../common/sequelize/deleteTrip.sequelize.js';
import buttons from "../../common/consts/buttons.const.js";
import {backToStart} from "../../common/helpers/messages.helper.js";
import message from "../../common/consts/messages.const.js";
import {getFrom, getTo, getDate} from "../../common/helpers/validation.helper.js";

export const deleteTripScene = new Scenes.WizardScene(
    'deleteTrip',
    async (ctx: any) => {
        const chatId = String(ctx.message?.from.id);
        getTripByChatId(chatId).then((data) => {
            if (data.length) {
                const btns = data.map((trip: any) => `${trip.from} -> ${trip.to}, (${moment(trip.tripDate).format('DD.MM.yyyy')})`);
                btns.push(buttons.BACK);
                ctx.reply(message.DELETE_ROUTE, Markup.keyboard(btns).oneTime().resize());

                return ctx.wizard.next();
            } else {
                ctx.reply(message.NO_SAVED_ROUTES, buttons.MAIN_MENU);
                ctx.scene.leave();
            }
        });
    },
    async (ctx) => {
            if (ctx.message.text === buttons.BACK) {
                await backToStart(ctx);
                return;
            }

            const chatId = String(ctx.message?.from.id);
            const from = getFrom(ctx.message?.text, '->');
            const toDate = getTo(ctx.message?.text, '->').trim().split(',');
            const to = toDate[0];
            const date = getDate(toDate[1].trim().slice(1,11));

            deleteTrip(chatId, from, to, date).then(() => {
                ctx.reply(`Маршрут ${from} -> ${to}, ${moment(date).format('DD.MM.YYYY')} удален`, buttons.MAIN_MENU)
            });
            await ctx.scene.leave();
    });
