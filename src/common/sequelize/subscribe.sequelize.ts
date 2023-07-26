import {db} from "../../connections/db.connection.js";
import SubscriptionModel from "../../models/subscriptions.model.js";

export const subscribe = async (chatId: string, from: string, to: string, startDate: string, endDate: string) => {
    await db.sync();
    await SubscriptionModel.create({chatId, from, to, startDate, endDate});
};
