import {db} from "../../connections/db.connection.js";
import SubscriptionModel from "../../models/subscriptions.model.js";

export const unsubscribe = async (chatId: string, from: string, to: string) => {
    return db.sync().then(async () => {
        const subscription = await SubscriptionModel.findOne({
            where: {
                chatId: chatId,
                from: from,
                to: to,
                isActive: true
            }
        });

        if (subscription) {
            await subscription.update({
                isActive: false
            });
        }
    });
};