const {Scenes, Markup} = require("telegraf");
const moment = require("moment/moment");
const {getTripByChatId} = require('../../common/sequelize/getTripByChatId.sequilize');
const {deleteTrip} = require('../../common/sequelize/deleteTrip.sequelize');
const buttons = require("../../common/consts/buttons.const");
const {backToStart} = require("../../common/helpers/messages.helper");
const message = require("../../common/consts/messages.const");
const {getFrom, getTo, getDate} = require("../../common/helpers/validation.helper");

const deleteTripScene = new Scenes.WizardScene(
    'deleteTrip',
    async (ctx) => {
        const chatId = String(ctx.message.from.id);
        getTripByChatId(chatId).then((data) => {
            if (data.length) {
                const btns = data.map((trip) => `${trip.from} -> ${trip.to}, (${moment(trip.tripDate).format('DD.MM.yyyy')})`);
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
        if (ctx.message?.text === buttons.BACK) {
            await backToStart(ctx);
            return;
        }

        const chatId = String(ctx.message.from.id);
        const from = getFrom(ctx.message?.text, '->');
        const toDate = getTo(ctx.message?.text, '->').trim().split(',');
        const to = toDate[0];
        const date = getDate(toDate[1].trim().slice(1,11));

        deleteTrip(chatId, from, to, date).then(() => {
            ctx.reply(`Маршрут ${from} -> ${to}, ${moment(date).format('DD.MM.YYYY')} удален`, buttons.MAIN_MENU)
        });
        await ctx.scene.leave();
    });

module.exports = {deleteTripScene};