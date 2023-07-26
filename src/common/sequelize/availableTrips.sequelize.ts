import {db} from "../../connections/db.connection.js";
import TripModel from "../../models/trips.model.js";
import {Op} from "sequelize";

export const getAvailableTrips = async () => {

    return db.sync().then(async () => {
        const currentDate = new Date();
        const trips = await TripModel.findAll({
            where: {
                tripDate: {[Op.gt]: currentDate},
                isActive: true}});
        const tripsList = trips
            .map((trip: any) => {return `${trip.from} -> ${trip.to}`;})
            .filter((value: string, index: number, array: string[]) => array.indexOf(value) === index).sort();

        return tripsList;
    });
};