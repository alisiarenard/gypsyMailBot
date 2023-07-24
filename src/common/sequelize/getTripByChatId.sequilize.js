const db = require("../../connections/db.connection");
const TripModel = require("../../models/trips.model");
exports.getTripByChatId = async (chatId) => {
    return db.sync().then(async () => {
        const trips = await TripModel.findAll({
            where: {
                chatId: chatId,
                isActive: true
            },
            order: [['tripDate', 'DESC']]});

        return trips;
    });
};