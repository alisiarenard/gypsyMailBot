const db = require("../../connections/db.connection");
const SubscriptionModel = require("../../models/subscriptions.model");
exports.getSubscriptionByChatId = async (chatId) => {
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