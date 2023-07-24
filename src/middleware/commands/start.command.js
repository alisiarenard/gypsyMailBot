const {startAction} = require("../actions/start.action");
const {bot} = require("../../connections/token.connection");

module.exports = bot.start(async (ctx) => {
    await startAction(ctx);
});