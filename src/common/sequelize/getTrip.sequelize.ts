import {db} from "../../connections/db.connection.js";
import TripModel from "../../models/trips.model.js";
import {Op} from "sequelize";

export const getTrip = async (from: string, to: string) => {
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
