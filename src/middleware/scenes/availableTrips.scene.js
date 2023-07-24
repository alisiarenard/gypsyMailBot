const {Scenes, Markup} = require("telegraf");
const {getAvailableTrips} = require("../../common/sequelize/availableTrips.sequelize");
const message = require('../../common/consts/messages.const');
const {getTrip} = require("../../common/sequelize/getTrip.sequelize");
const {getTripMessage} = require("../../common/helpers/messages.helper");
const buttons = require("../../common/consts/buttons.const");
const {startAction} = require("../actions/start.action");
const {getFrom, getTo} = require("../../common/helpers/validation.helper");

const showAvailableTripsScene = new Scenes.WizardScene(
    'showAvailableTrips',
    async (ctx) => {
        try {

            getAvailableTrips().then((data) => {
                if (data.length) {
                    const btns = data.map((trip) => {
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
                const from = getFrom(ctx.callbackQuery.data, '->');
                const to = getTo(ctx.callbackQuery.data, '->');

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

module.exports = {showAvailableTripsScene};