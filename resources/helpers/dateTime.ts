const durationStringToObject = (duration: string) => {
  const [secondsString, minutesString, hoursString] = duration
    .split(":")
    .reverse();

  return {
    secondsString: secondsString ? Number(secondsString) : undefined,
    minutesString: minutesString ? Number(minutesString) : 0,
    hoursString: hoursString ? Number(hoursString) : undefined,
  };
};

export const formattedDuration = (duration: string) => {
  const { minutesString, hoursString } = durationStringToObject(duration);
  const formattedHours =
    hoursString !== undefined && Number(hoursString) !== 0
      ? Number(hoursString) + "h"
      : "";
  return `${formattedHours}${Number(minutesString)}min`;
};

export const formattedReleaseDate = (releaseDate: string) => {
  const [weekday, day, month, year] = releaseDate.split(" ");
  const isCurrentYear = Number(year) === new Date().getFullYear();
  return `${weekday} ${day} ${month}${isCurrentYear ? "" : ` ${year}`}`;
};
