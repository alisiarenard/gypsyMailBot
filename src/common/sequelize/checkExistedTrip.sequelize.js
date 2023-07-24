const db = require("../../connections/db.connection");
const TripModel = require("../../models/trips.model");

exports.checkExistedTrip = async (chatId, from, to, date) => {
    return db.sync().then(async () => {
        const trip = await TripModel.findAll({
            where: {
                chatId: chatId,
                from: from,
                to: to,
                tripDate: date,
                isActive: true }
        });

        return trip;
    });
};