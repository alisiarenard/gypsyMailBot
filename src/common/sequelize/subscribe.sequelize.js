const  db = require("../../connections/db.connection");
const SubscriptionModel = require("../../models/subscriptions.model");

exports.subscribe = async (chatId, from, to, startDate, endDate) => {
    await db.sync();
    await SubscriptionModel.create({chatId, from, to, startDate, endDate});
};
