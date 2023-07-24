const db = require("../../connections/db.connection");
const TripModel = require("../../models/trips.model");

exports.deleteTrip = (chatId, from, to, date) => {
    return db.sync().then(async () => {
        const subscription = await TripModel.findOne({
            where: {
                chatId: chatId,
                from: from,
                to: to,
                tripDate: date,
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