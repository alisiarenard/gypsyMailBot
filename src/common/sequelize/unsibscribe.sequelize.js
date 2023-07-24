const db = require("../../connections/db.connection");
const SubscriptionModel = require("../../models/subscriptions.model");

exports.unsubscribe = async (chatId, from, to) => {
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
            subscription.update({
                isActive: false
            });
        }
    });
};