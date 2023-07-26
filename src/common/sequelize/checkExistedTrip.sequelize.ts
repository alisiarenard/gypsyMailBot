import {db} from "../../connections/db.connection.js";
import TripModel from "../../models/trips.model.js";

export const checkExistedTrip = async (chatId: string, from: string, to: string, date: string) => {
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