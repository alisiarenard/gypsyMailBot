import {db} from "../../connections/db.connection.js";
import SubscriptionModel from "../../models/subscriptions.model.js";

export const getSubscriptionByChatId = async (chatId: string) => {
    return db.sync().then(async () => {
        const trips = await SubscriptionModel.findAll({
            where: {
                chatId: chatId,
                isActive: true
            },
            order: [['startDate', 'DESC']]
        });

        return trips;
    });
};