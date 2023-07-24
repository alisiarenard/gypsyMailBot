const SubscriptionModel = require("../../models/subscriptions.model");
exports.getSubscriptions = async (from, to) => {
    const subscriptions = await SubscriptionModel.findAll({
        where: {
            from: from,
            to: to,
            isActive: true}});
    const subscriptionsChatIds = subscriptions.map(s => s.chatId);

    return subscriptionsChatIds;
}