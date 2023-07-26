import SubscriptionModel from "../../models/subscriptions.model.js";
import {db} from "../../connections/db.connection.js";

export const getSubscriptions = async (from: string, to: string) => {
    return db.sync().then(async () => {
        const subscriptions = await SubscriptionModel.findAll({
            where: {
                from: from,
                to: to,
                isActive: true
            }
        });

        const subscriptionsChatIds = subscriptions.map((s: any) => s.chatId);

        return subscriptionsChatIds;
    });
}