const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
export const formatTime = (time: string) => {
  return new Date(time).toLocaleDateString("en-US", dateOptions);
};
