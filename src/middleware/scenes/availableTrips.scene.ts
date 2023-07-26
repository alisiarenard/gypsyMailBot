import {Scenes, Markup} from "telegraf";
import {getAvailableTrips} from "../../common/sequelize/availableTrips.sequelize.js";
import message from '../../common/consts/messages.const.js';
import {getTrip} from "../../common/sequelize/getTrip.sequelize.js";
import {getTripMessage} from "../../common/helpers/messages.helper.js";
import buttons from "../../common/consts/buttons.const.js";
import {startAction} from "../actions/start.action.js";
import {getFrom, getTo} from "../../common/helpers/validation.helper.js";

export const showAvailableTripsScene = new Scenes.WizardScene(
    'showAvailableTrips',
    async (ctx: any) => {
        try {

            // @ts-ignore
            getAvailableTrips().then((data) => {
                if (data.length) {
                    const btns = data.map((trip: string) => {
                        return [Markup.button.callback(trip, trip)];
                    });
                    btns.push([Markup.button.callback(buttons.BACK, buttons.BACK)]);
                    ctx.reply(message.AVAILABLE_ROUTES, Markup.inlineKeyboard(btns));

                    return ctx.wizard.next();
                } else {
                    ctx.reply(message.EMPTY_ROUTES, buttons.MAIN_MENU);
                    return ctx.scene.leave();
                }
            });
        } catch (e) {
            console.log(e);
            return ctx.scene.leave();
        }
    },
    async (ctx) => {
        try {
            if (ctx.callbackQuery?.data === buttons.BACK) {
                await ctx.scene.leave();
                await startAction(ctx);
                return;
            }

            if (ctx.callbackQuery?.data) {
                await ctx.deleteMessage();

                const from = getFrom(ctx.callbackQuery?.data, '->');

                const to = getTo(ctx.callbackQuery?.data, '->');

                getTrip(from, to).then(async (data) => {
                    if (data.length) {
                        await ctx.replyWithHTML(`<b>Маршрут ${from} - ${to}:</b>`, buttons.MAIN_MENU);
                        await data.forEach((trip) => {
                            ctx.replyWithHTML(getTripMessage(trip));
                        });
                    }
                });
                return ctx.scene.leave();
            }
        } catch (e) {
            console.log(e);
            return ctx.scene.leave();
        }

    });