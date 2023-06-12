import { DateFilter } from "./Dashboard";

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

export const getStatus = (launchSuccess: boolean, upcoming: boolean) => {
  if (upcoming) return "upcoming";
  if (launchSuccess) return "success";
  return "failed";
};

export const parseDateRange = (unit: "month" | "year", value: number) => {
  const date = new Date();
  if (unit === "month") date.setMonth(date.getMonth() - value);
  else date.setFullYear(date.getFullYear() - value);

  const start = date.toISOString().split("T")[0];
  const end = new Date().toISOString().split("T")[0];
  return { start, end };
};

export const getStartAndEnd = (range: DateFilter) => {
  switch (range) {
    case "pastThreeMonths":
      return parseDateRange("month", 3);

    case "pastSixMonths":
      return parseDateRange("month", 6);

    case "lastYear":
      return parseDateRange("year", 1);

    case "lastTwoYear":
      return parseDateRange("year", 2);

    case "lastFiveYear":
      return parseDateRange("year", 5);

    case "lastTwentyYear":
      return parseDateRange("year", 20);

    default:
      return { start: null, end: null };
  }
};
