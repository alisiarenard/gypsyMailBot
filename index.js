// CONNECTION
require("./src/connections/local.connection");

//DATABASE
require("./src/connections/db.connection");

const { Sequelize } = require('sequelize');
const { Scenes, session, Markup, leave} = require("telegraf");
const {bot} = require("./src/connections/token.connection");
const {getTripScene} = require("./src/middleware/scenes/request.scene");
const {saveTripScene} = require("./src/middleware/scenes/trip.scene");
const {showAvailableTripsScene} = require("./src/middleware/scenes/availableTrips.scene");
const {unsubscribeScene} = require('./src/middleware/scenes/unsubscribe.scene');
const {deleteTripScene} = require('./src/middleware/scenes/deleteTrip.scene');

const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
        dialect: process.env.POSTGRES_DIALECT,
    });

sequelize.authenticate().then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log(err);
});


const stage = new Scenes.Stage([showAvailableTripsScene, saveTripScene, getTripScene, unsubscribeScene, deleteTripScene]);
bot.use(session());
bot.use(stage.middleware());

// HANDLERS
require('./src/middleware/handlers/mainMenu.handler');


// COMMANDS
require("./src/middleware/commands/start.command");
