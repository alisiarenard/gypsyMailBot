const db = require("../../connections/db.connection");
const SubscriptionModel = require("../../models/subscriptions.model");
const {Op} = require("sequelize");

exports.checkSubscription = async (chatId, from, to) => {

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