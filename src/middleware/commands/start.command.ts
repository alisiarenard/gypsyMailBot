import {startAction} from "../actions/start.action.js";
import {bot} from "../../connections/token.connection.js";

bot.start(async (ctx) => {
    await startAction(ctx);
});