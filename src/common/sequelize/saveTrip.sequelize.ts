import {db} from "../../connections/db.connection.js";
import TripModel from "../../models/trips.model.js";

export const saveTrip = async (
    chatId: string,
    username: string,
    from: string,
    to: string,
    tripDate: string,
    parcelType: string,
    cost: string,
    comment: string) => {
    await db.sync();
    await TripModel.create({chatId, username, from, to, tripDate, parcelType, cost, comment});
};
