const db = require("../../connections/db.connection");
const TripModel = require("../../models/trips.model");
const {Markup} = require("telegraf");
const {Op} = require("sequelize");

exports.getAvailableTrips = async () => {

    return db.sync().then(async () => {
        const currentDate = new Date();
        const trips = await TripModel.findAll({
            where: {
                tripDate: {[Op.gt]: currentDate},
                isActive: true}});
        const tripsList = trips
            .map((trip) => {return `${trip.from} -> ${trip.to}`;})
            .filter((value, index, array) => array.indexOf(value) === index).sort();

        return tripsList;
    });
};