const moment = require("moment/moment");
const {startAction} = require('../../middleware/actions/start.action')

exports.getInvalidDirectionMessage = (fromIsValid, toIsValid) => {
    const direction = !fromIsValid && toIsValid ? 'отправления' : !toIsValid && fromIsValid ? 'назначения' : 'отправления и назначения';

    return `Ты указал несуществующий город ${direction}. Укажи маршрут в формате Город отправления Город назначения, например, Москва Белград`;
}

exports.getTripMessage = (trip) => {
    const href = `https://t.me/${trip.username}`
    const contact = Array.from(trip.username)[0] === '+' ? href : '@' + trip.username;
    const comment = trip.comment === 'Без комментария' ? '' : `\nКомментарий: ${trip.comment}`
    const formatDate = moment(trip.tripDate).format('DD.MM.yyyy');

    return `Контакт: ${contact}\nДата: ${formatDate}\nМожет передать: ${trip.parcelType}\nСтоимость: ${trip.cost}${comment}`;
}

exports.backToStart = async (ctx) => {
    await ctx.scene.leave();
    await ctx.reply('Предыдущая сессия завершена');
    await startAction(ctx);

}