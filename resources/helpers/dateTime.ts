// hides year if current year
export const formattedReleaseDate = (releaseDate: string) => {
  const [weekday, day, month, year] = releaseDate.split(" ");
  const isCurrentYear = Number(year) === new Date().getFullYear();
  return `${weekday} ${day} ${month}${isCurrentYear ? "" : ` ${year}`}`;
};

// formats seconds to hh:mm:ss, hides hours if 0
export const formatTimeFromSeconds = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().slice(11, 19);
  return timeString.startsWith("00:") ? timeString.slice(3) : timeString;
};

// trim leading 0
export const trimLeadingZero = (number: number) => {
  return number.toString().replace(/^0+/, "");
};

// formats hh:mm:ss to hours (optional) and minutes, trim leading 0 from hours
export const formatDurationFromTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  return `${
    hours !== "00" ? trimLeadingZero(Number(hours)) + "h" : ""
  }${minutes}min`;
};
