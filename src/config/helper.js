import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);


export const convertFromUTC = (timestamp) => {
    dayjs.tz.setDefault('auto');
    const isMilliseconds = timestamp.toString().length === 13;
    const utcDate = isMilliseconds ? dayjs(timestamp) : dayjs.unix(timestamp);
    return utcDate;
}