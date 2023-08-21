import {Scenes} from "telegraf";
import {saveTrip} from "../../common/sequelize/saveTrip.sequelize.js";
import {getSubscriptions} from "../../common/sequelize/getSubscriptions.sequelize.js";
import {checkExistedTrip} from '../../common/sequelize/checkExistedTrip.sequelize.js';
import {getTripsByChatId} from '../../common/sequelize/getTripsByChatId.sequilize.js';
import message from '../../common/consts/messages.const.js';
import {
    isValidInput,
    isValidCity,
    isValidFormatDate, getTo, getFrom, getDate, isValidFromTo
} from '../../common/helpers/validation.helper.js';
import {getInvalidDirectionMessage, getTripMessage, backToStart} from '../../common/helpers/messages.helper.js';
import buttons from "../../common/consts/buttons.const.js";
import * as console from "console";

const COMMANDS = [buttons.BACK, buttons.DELETE_SUBSCRIPTION, buttons.DELETE_TRIP, buttons.GET_TRIPS, buttons.SEE_ALL_ROUTES];

export const saveTripScene = new Scenes.WizardScene(
    'saveTrip',
    async (ctx: any) => {
        const chatId = ctx?.message ? String(ctx.message.chat.id) : ctx.callbackQuery?.message.chat.id;
        const existedTripsCounter = (await getTripsByChatId(chatId)).length;

        if (existedTripsCounter >= 3) {
            await ctx.reply(message.ROUTES_LIMIT_EXCEEDED, buttons.MAIN_MENU);
            await ctx.scene.leave();
            return;
        }

        await ctx.reply(message.FROM_TO, buttons.BACK_MENU);
        ctx.wizard.state.data = {};

        return ctx.wizard.next();
    },
    async (ctx) => {
        try {
            if (ctx.message?.text === buttons.SAVE_TRIP) {
                ctx.scene.reenter();
                return;
            }
            if (COMMANDS.includes(ctx.message?.text)) {
                await backToStart(ctx);
                return;
            }
            const isInvalidInput = !isValidInput(ctx.message?.text);

            if (isInvalidInput) {
                await ctx.reply(message.INVALID_ROUTE, buttons.BACK_MENU);
            } else {
                const from = getFrom(ctx.message?.text);
                const to = getTo(ctx.message?.text);
                const fromIsValid = isValidCity(from);
                const toIsValid = isValidCity(to);
                const isDiffCities = isValidFromTo(from, to);

                if (fromIsValid && toIsValid && isDiffCities) {
                    ctx.wizard.state.data.from = from;
                    ctx.wizard.state.data.to = to;

                    await ctx.reply(message.DATE, buttons.BACK_MENU);

                    return ctx.wizard.next();
                } else {
                    await ctx.reply(getInvalidDirectionMessage(fromIsValid, toIsValid, isDiffCities), buttons.BACK_MENU);
                }
            }
        } catch (e) {
            await ctx.scene.leave();
            console.log(e);
            await backToStart(ctx);
        }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text === buttons.SAVE_TRIP) {
                ctx.scene.reenter();
                return;
            }
            if (COMMANDS.includes(ctx.message?.text)) {
                await backToStart(ctx);
                return;
            }

            const isInvalidFormatDate = !isValidFormatDate(ctx.message?.text);
            const date = getDate(ctx.message?.text);
            const isFutureDate = new Date < date;

            if (isInvalidFormatDate || !isFutureDate) {
                await ctx.reply(isInvalidFormatDate ? message.INVALID_DATE : message.PAST_DATE, buttons.BACK_MENU);
            } else {
                ctx.wizard.state.data.tripDate = date;

                const from = ctx.wizard.state.data.from;
                const to = ctx.wizard.state.data.to;
                const tripDate = ctx.wizard.state.data.tripDate;
                const chatId = ctx?.message ? String(ctx.message.chat.id) : ctx.callbackQuery?.message.chat.id;

                const isExistedTrip = await checkExistedTrip(chatId, from, to, tripDate);

                if (isExistedTrip.length > 0) {
                    await ctx.reply(message.EXISTED_ROUTE, buttons.MAIN_MENU);
                    await ctx.scene.leave();
                    return;
                }
                await ctx.reply(message.SHARE_PHONE, ctx.message?.from.username ? buttons.SHARE_CONTACT_MENU : buttons.SHARE_PHONE_MENU);
                return ctx.wizard.next();
            }

        } catch
            (e) {
            await ctx.scene.leave();
            console.log(e);
            await backToStart(ctx);
        }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text === buttons.SAVE_TRIP) {
                ctx.scene.reenter();
                return;
            }

            if (COMMANDS.includes(ctx.message?.text)) {
                await backToStart(ctx);
                return;
            }
            if (ctx.message.text && ctx.message.text !== buttons.USE_USERNAME && ctx.message.text !== buttons.SHARE_PHONE) {
                await ctx.reply(message.CHOICE_FROM_MENU, message.SHARE_PHONE, ctx.message?.from.username ? buttons.SHARE_CONTACT_MENU : buttons.SHARE_PHONE_MENU);
            } else {
                ctx.wizard.state.data.contact = ctx.message?.text === buttons.USE_USERNAME ?
                    ctx.message.from.username : '+' + ctx.message?.contact.phone_number;

                await ctx.reply(message.PARCEL_TYPE, buttons.PARCEL_TYPE_MENU);

                return ctx.wizard.next();
            }


        } catch (e) {
            await ctx.scene.leave();
            console.log(e);
            await backToStart(ctx);
        }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text === buttons.SAVE_TRIP) {
                ctx.scene.reenter();
                return;
            }

            if (COMMANDS.includes(ctx.message?.text)) {
                await backToStart(ctx);
                return;
            }
            ctx.wizard.state.data.parcelType = ctx.message?.text;

            await ctx.reply(message.COST, buttons.COST_MENU);

            return ctx.wizard.next();
        } catch (e) {
            await ctx.scene.leave();
            console.log(e);
            await backToStart(ctx);
        }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text === buttons.SAVE_TRIP) {
                ctx.scene.reenter();
                return;
            }

            if (COMMANDS.includes(ctx.message?.text)) {
                await backToStart(ctx);
                return;
            }
            ctx.wizard.state.data.cost = ctx.message?.text;

            await ctx.reply(message.COMMENT, buttons.COMMENT_MENU);

            return ctx.wizard.next();
        } catch (e) {
            await ctx.scene.leave();
            console.log(e);
            await backToStart(ctx);
        }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text === buttons.SAVE_TRIP) {
                ctx.scene.reenter();
                return;
            }

            if (COMMANDS.includes(ctx.message?.text)) {
                await backToStart(ctx);
                return;
            }
            ctx.wizard.state.data.comment = ctx.message?.text;
            const chatId = ctx?.message ? String(ctx.message.chat.id) : ctx.callbackQuery?.message.chat.id;
            const username = ctx.wizard.state.data.contact;
            const from = ctx.wizard.state.data.from;
            const to = ctx.wizard.state.data.to;
            const tripDate = ctx.wizard.state.data.tripDate;
            const parcelType = ctx.wizard.state.data.parcelType;
            const cost = ctx.wizard.state.data.cost;
            const comment = ctx.wizard.state.data.comment;

            await saveTrip(chatId, username, from, to, tripDate, parcelType, cost, comment);

            await ctx.replyWithHTML(`Информация о твоей поездке ${from} - ${to} сохранена.\nПосле даты сохраненной поездки информация о ней будет удалена <i>автоматически</i>.\n<b>ВНИМАНИЕ!</b>\nВсегда проверяй содержание посылок, которые перевозишь.`, buttons.MAIN_MENU);

            const subscriptions = await getSubscriptions(from, to);

            if (subscriptions.length) {
                subscriptions.forEach(s => {
                    const trip = {username, tripDate, comment, parcelType, cost}
                    ctx.telegram.sendMessage(String(s), `Добавлена новая поездка по маршруту ${from} - ${to}\n${getTripMessage(trip)}`);
                })
            }
            return ctx.scene.leave();
        } catch (e) {
            await ctx.scene.leave();
            console.log(e);
            await backToStart(ctx);
        }
    }
);
