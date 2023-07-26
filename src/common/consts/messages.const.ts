const FROM_TO = 'Укажи маршрут в формате Город отправления, Город назначения через запятую, например, Москва, Белград';
const INVALID_ROUTE = 'Ты указал маршрут в неверном формате. Укажи маршрут в формате Город отправления, Город назначения через запятую, например, Москва, Белград';
const NO_ROUTES = `По указанному маршруту нет данных.\nТы можешь подписаться на маршрут и в течении следущих <b>14 дней</b> получать уведомления, если кто-то добавить информацию о нужном тебе маршруте`;
const DATE = 'Укажи дату прибытия в город назначения в формате дд.мм.гггг, например, 02.04.2024';
const INVALID_DATE = 'Ты указал несуществующую дату. Укажите дату прибытия в город назначения в формате дд.мм.гггг, например, 02.04.2024';
const PAST_DATE = 'Ты указал прошедшую дату. Укажите дату прибытия в город назначения в формате дд.мм.гггг, например, 02.04.2024';
const SHARE_PHONE = 'У тебя отсутствует username, поэтому поделись номером телефона';
const PARCEL_TYPE = 'Выбери, что ты готов передать';
const COST = 'Укажи стоимость вознаграждения';
const COMMENT = 'Укажи комментарий';
const AVAILABLE_ROUTES = 'Доступные маршруты:';
const DELETE_ROUTE = 'Выбери маршрут, который хочешь удалить:';
const NO_SAVED_ROUTES = 'У тебя нет сохраненных поездок';
const PAID_WARNING = `<b>ВНИМАНИЕ!</b>\nНикогда не переводите предоплату за передачу документов/багажа`;
const EXISTED_ROUTE = 'Маршрут на указанную дату уже существует.';
const ROUTES_LIMIT_EXCEEDED = 'Можно добавить не более 3 активных маршрутов';
const DELETE_SUBSCRIPTION = 'Выберете маршрут для которого хотите удалить подписку:';
const NO_SUBSCRIPTIONS = 'Ты не подписан ни на один маршрут';
const EMPTY_ROUTES = 'Пока не добавлено ни одного маршрута';

const messages = {
    FROM_TO,
    INVALID_ROUTE,
    NO_ROUTES,
    NO_SAVED_ROUTES,
    DATE,
    INVALID_DATE,
    PAST_DATE,
    SHARE_PHONE,
    PARCEL_TYPE,
    COST,
    COMMENT,
    AVAILABLE_ROUTES,
    DELETE_ROUTE,
    PAID_WARNING,
    EXISTED_ROUTE,
    ROUTES_LIMIT_EXCEEDED,
    DELETE_SUBSCRIPTION,
    NO_SUBSCRIPTIONS,
    EMPTY_ROUTES
};

export default messages;