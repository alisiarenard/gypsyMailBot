// @ts-ignore
// import dotenv from 'dotenv';
import { Scenes, session, Telegraf, Context } from "telegraf";
import {getTripScene} from "./src/middleware/scenes/request.scene.js";
import {saveTripScene} from "./src/middleware/scenes/trip.scene.js";
import {showAvailableTripsScene} from "./src/middleware/scenes/availableTrips.scene.js";
import {unsubscribeScene} from './src/middleware/scenes/unsubscribe.scene.js';
import {deleteTripScene} from './src/middleware/scenes/deleteTrip.scene.js';
import { startAction } from "./src/middleware/actions/start.action.js";
import buttons from "./src/common/consts/buttons.const.js";
import {Dialect, Sequelize} from "sequelize";
import { conf } from "./src/connections/conf.js";

const bot = new Telegraf<Scenes.SceneContext>(conf.botToken);
(async (): Promise<void> => { await bot.launch(); })();

bot.start(async (ctx) => { await startAction(ctx); });

const db = new Sequelize(conf.database, conf.username, conf.password,
    {
        host: conf.host,
        port: conf.port,
        dialect: conf.dialect as Dialect
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


export default db;