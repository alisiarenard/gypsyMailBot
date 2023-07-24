const db = require("../../connections/db.connection");
const SubscriptionsModel = require("../../models/subscriptions.model");
const {Op} = require("sequelize");
exports.deletePastSubscriptions = async () => {
    return db.sync().then(async () => {
        const currentDate = new Date();
        await SubscriptionsModel.destroy({where: {endDate: {[Op.lt]: currentDate}}});
    });
};