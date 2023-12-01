import { parse } from 'date-fns'

export const parseDateTime = (date, time) => parse(`${date}T${time}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());