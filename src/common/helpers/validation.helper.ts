import cities from "../../dictionary/cities.dictionary.js";

export const isValidInput = (text: string) => /[а-яА-ЯЁё,-]+\s[а-яА-ЯЁё,-]+/.test(text) && text.includes(',');
export const isValidCity = (cityName: string) => cities.city.filter((city: any) => city.name.toLowerCase() === cityName.trim().toLowerCase()).length !==0;
export const isValidFormatDate = (date: string) => /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/.test(date);

export const getFrom = (item: any, divider = ',') => item.split(divider)[0]?.trim();
export const getTo = (item: any, divider = ',') => item.split(divider)[1]?.trim();
export const getDate = (date: string) => {
    const splitDate = date.split(".");
    return new Date(new Date(splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]))
};