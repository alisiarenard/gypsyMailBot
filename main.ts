// @ts-ignore
import dotenv from 'dotenv';
import { Scenes, session, Telegraf, Context } from "telegraf";
import {getTripScene} from "./src/middleware/scenes/request.scene.js";
import {saveTripScene} from "./src/middleware/scenes/trip.scene.js";
import {showAvailableTripsScene} from "./src/middleware/scenes/availableTrips.scene.js";
import {unsubscribeScene} from './src/middleware/scenes/unsubscribe.scene.js';
import {deleteTripScene} from './src/middleware/scenes/deleteTrip.scene.js';
import { startAction } from "./src/middleware/actions/start.action.js";
import buttons from "./src/common/consts/buttons.const.js";
import {Sequelize} from "sequelize";

dotenv.config();

const bot = new Telegraf<Scenes.SceneContext>(process.env.BOT_TOKEN as string);
(async (): Promise<void> => { await bot.launch(); })();

bot.start(async (ctx) => { await startAction(ctx); });

const db = new Sequelize(
    process.env.POSTGRES_DATABASE as string,
    process.env.POSTGRES_USERNAME as string,
    process.env.POSTGRES_PASSWORDas as string,
    {
        host: process.env.POSTGRES_HOST as string,
        port: 5432,
        dialect: 'postgres'
    }
);

db.authenticate().then(() => { console.log('DB connected'); }).catch((err) => { console.log(err); });

const stage = new Scenes.Stage([showAvailableTripsScene, saveTripScene, getTripScene, unsubscribeScene, deleteTripScene], {ttl: 600});
bot.use(session());
bot.use(stage.middleware());

bot.hears(buttons.SAVE_TRIP, async (ctx) => {
    await ctx.scene.enter("saveTrip"); });
bot.hears(buttons.GET_TRIPS, async (ctx) => {
    await ctx.scene.enter("getTrip"); });
bot.hears(buttons.SEE_ALL_ROUTES, async (ctx) => {
    await ctx.scene.enter("showAvailableTrips"); });
bot.hears(buttons.DELETE_TRIP, async (ctx) => {
    await ctx.scene.enter("deleteTrip"); });
bot.hears(buttons.DELETE_SUBSCRIPTION, async (ctx) => {
    await ctx.scene.enter("unsubscribe"); });
