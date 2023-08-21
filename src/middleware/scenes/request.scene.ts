import {Scenes, Markup} from "telegraf";
import {getTrip} from "../../common/sequelize/getTrip.sequelize.js";
import {subscribe} from "../../common/sequelize/subscribe.sequelize.js";
import {isValidInput, isValidCity, isValidFromTo} from '../../common/helpers/validation.helper.js';
import moment from "moment";
import message from '../../common/consts/messages.const.js';
import {getInvalidDirectionMessage, getTripMessage, backToStart} from '../../common/helpers/messages.helper.js';
import {checkSubscription} from "../../common/sequelize/checkSubscriptions.sequelize.js";
import buttons from "../../common/consts/buttons.const.js";
import {getFrom, getTo} from "../../common/helpers/validation.helper.js";

const COMMANDS = [buttons.BACK, buttons.DELETE_SUBSCRIPTION, buttons.DELETE_TRIP, buttons.SAVE_TRIP, buttons.SEE_ALL_ROUTES];

export const getTripScene = new Scenes.WizardScene(
        'getTrip',
        async (ctx: any) => {
            await ctx.reply(message.FROM_TO, buttons.BACK_MENU);

            ctx.wizard.state.data = {};
            return ctx.wizard.next();
        },
        async (ctx) => {
            try {
                if (ctx.message?.text === buttons.GET_TRIPS) {
                    ctx.scene.reenter();
                    return;
                }
                if (COMMANDS.includes(ctx.message?.text)) {
                    await backToStart(ctx);
                    return;
                }

                const isInvalidInput = !isValidInput(ctx.message?.text);
                if (isInvalidInput) {
                    await ctx.reply(message.INVALID_ROUTE);
                } else {
                    const from = getFrom(ctx.message?.text);
                    const to = getTo(ctx.message?.text);
                    const fromIsValid = isValidCity(from);
                    const toIsValid = isValidCity(to);
                    const isDiffCities = isValidFromTo(from, to);

                    if (fromIsValid && toIsValid && isDiffCities) {
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
                        await ctx.reply(getInvalidDirectionMessage(fromIsValid, toIsValid, isDiffCities));
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
                if (COMMANDS.includes(ctx.message?.text)) {
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

getTripScene.action(buttons.GET_TRIPS, async (ctx) => {
    console.log(ctx, 'sdgsdgsdg')
})


const onSubscribe = (ctx: any) => {
    try {
        const chatId = ctx.message.chat.id;
        const from = ctx.wizard.state.data.from;
        const to = ctx.wizard.state.data.to;
        const startDate = new Date().toISOString();
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
