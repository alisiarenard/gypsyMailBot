const {Scenes, Markup} = require("telegraf");
const {getTrip} = require("../../common/sequelize/getTrip.sequelize");
const {subscribe} = require("../../common/sequelize/subscribe.sequelize");
const {isValidInput, isValidCity} = require('../../common/helpers/validation.helper');
const moment = require("moment");
const message = require('../../common/consts/messages.const');
const {getInvalidDirectionMessage, getTripMessage, backToStart} = require('../../common/helpers/messages.helper');
const {checkSubscription} = require("../../common/sequelize/checkSubscriptions.sequelize");
const buttons = require("../../common/consts/buttons.const");
const {getFrom, getTo} = require("../../common/helpers/validation.helper");

const getTripScene = new Scenes.WizardScene(
        'getTrip',
        async (ctx) => {
            await ctx.reply(message.FROM_TO);

            ctx.wizard.state.data = {};
            return ctx.wizard.next();
        },
        async (ctx) => {
            try {
                const isInvalidInput = !isValidInput(ctx.message?.text);
                if (isInvalidInput) {
                    await ctx.reply(message.INVALID_ROUTE);
                } else {
                    const from = getFrom(ctx.message?.text);
                    const to = getTo(ctx.message?.text);
                    const fromIsValid = isValidCity(from);
                    const toIsValid = isValidCity(to);

                    if (fromIsValid && toIsValid) {
                        const data = await getTrip(from, to);
                        ctx.wizard.state.data.from = from;
                        ctx.wizard.state.data.to = to;

                        if (data.length) {
                            await ctx.replyWithHTML(message.PAID_WARNING, buttons.MAIN_MENU)
                            await data.forEach((trip) => {
                                ctx.replyWithHTML(getTripMessage(trip));
                            });
                            await ctx.scene.leave();
                        } else {
                            await ctx.replyWithHTML(message.NO_ROUTES, buttons.NO_AVAILABLE_ROUTES);
                            return ctx.wizard.next();
                        }
                    } else {
                        await ctx.reply(getInvalidDirectionMessage(fromIsValid, toIsValid));
                    }
                }
            } catch
                (e) {
                await ctx.scene.leave();
                await backToStart(ctx);
            }
        },
        async (ctx) => {
            try {
                if (ctx.message?.text === buttons.BACK) {
                    await backToStart(ctx);
                    return;
                }
                if (ctx.message?.text === buttons.SUBSCRIBE) {
                    await onSubscribe(ctx);
                    return ctx.scene.leave();
                }
                if (ctx.message?.text === buttons.NEW_ROUTE) {
                    await ctx.scene.reenter();
                }
            } catch (e) {
                await ctx.scene.leave();
                await backToStart(ctx);
            }
        }
    );


const onSubscribe = (ctx) => {
    try {
        const chatId = ctx.message.chat.id;
        const from = ctx.wizard.state.data.from;
        const to = ctx.wizard.state.data.to;
        const startDate = new Date();
        const endDate = moment().add(14, 'days').toISOString();
        checkSubscription(String(chatId), from, to).then((subscriptions) => {
            if (subscriptions.length) {
                ctx.reply(`Вы уже подписаны на обновления по маршруту ${from} - ${to}`, buttons.MAIN_MENU);
            } else {
                subscribe(chatId, from, to, startDate, endDate).then(() => {
                    ctx.reply(`Вы подписаны на обновления по маршруту ${from} - ${to}`, buttons.MAIN_MENU);
                });
            }
            ctx.scene.leave();
        });

    } catch (e) {
        console.log(e);
        ctx.scene.leave();
        backToStart(ctx);
    }
}

module.exports = {getTripScene};