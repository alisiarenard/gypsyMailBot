import {startAction} from "../actions/start.action.js";
import {bot} from "../../connections/token.connection.js";

bot.start(async (ctx: any) => {
    await startAction(ctx);
});