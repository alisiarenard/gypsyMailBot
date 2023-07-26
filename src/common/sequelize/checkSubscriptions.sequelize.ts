import {db} from "../../connections/db.connection.js";
import SubscriptionModel from "../../models/subscriptions.model.js";
import {Op} from "sequelize";

export const checkSubscription = async (chatId: string, from: string, to: string) => {

    return db.sync().then(async () => {
        const currentDate = new Date();
        const subscription = await SubscriptionModel.findAll({
            where: {
                chatId: chatId,
                from: from,
                to: to,
                isActive: true,
                endDate: {[Op.gt]: currentDate}}
        });

        return subscription;
    });
};