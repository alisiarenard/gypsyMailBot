const  db = require("../../connections/db.connection");
const TripModel = require("../../models/trips.model");
const {Op} = require("sequelize");

exports.getTrip = async (from, to) => {
    const currentDate = new Date;
    return db.sync().then(async () => {
        const trips = await TripModel.findAll({
            where: {
                from: from,
                to: to,
                isActive: true,
                tripDate: {[Op.gt]: currentDate}
            },
            order: [['tripDate', 'ASC']]
        });

        return trips;
    });
};
