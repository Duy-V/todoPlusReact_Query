import dayjs from "dayjs";
import "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
// dayjs.locale('vi');
dayjs.tz.setDefault(VIETNAM_TIMEZONE);

export type Dayjs = dayjs.Dayjs;

export const convertUtcToVietnamTime = (date: Date | string): Dayjs => {
  return dayjs.utc(date).tz(VIETNAM_TIMEZONE);
};

export const convertVietnamToUtcTime = (date: Date | string): Dayjs => {
  return dayjs(date).tz(VIETNAM_TIMEZONE, true).utc();
};
