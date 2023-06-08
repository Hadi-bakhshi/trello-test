
import moment from 'jalali-moment';

export const calcDiffrentTime = (time1: string, time2: string) => {
  const doneTime = moment.unix(+time1);
  const wipTime = moment.unix(+time2);

  const duration = moment.duration(doneTime.diff(wipTime));
  const hoursDiff = Math.floor(duration.asHours());
  const minutesDiff = duration.minutes();
  const secondsDiff = duration.seconds();

  return `${hoursDiff}:${minutesDiff}:${secondsDiff}`;
}