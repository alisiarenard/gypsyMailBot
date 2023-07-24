const db = require("../../connections/db.connection");
const TripModel = require("../../models/trips.model");

exports.getTripsByChatId = async (chatId) => {
    return db.sync().then(async () => {
        const trips = await TripModel.findAll({
            where: {
                chatId: chatId,
                isActive: true
            }});

        return trips;
    });
};