const  db = require("../../connections/db.connection");
const TripModel = require("../../models/trips.model");

exports.saveTrip = async (chatId, username, from, to, tripDate, parcelType, cost, comment) => {
    await db.sync();
    await TripModel.create({chatId, username, from, to, tripDate, parcelType, cost, comment});
};
