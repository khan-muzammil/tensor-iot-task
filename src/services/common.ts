import { api } from "./apiClient";
import { LAUNCHES } from "./constants";

type GetLaunchType = {
  start?: string;
  end?: string;
};

export const getLaunchesData = ({ start = "", end = "" }: GetLaunchType) => {
  if (start && end) return api.get(`${LAUNCHES}?start=${start}&end=${end}`);
  return api.get(LAUNCHES);
};

export const getLaunchDataByFlightNumber = (flightNumber: number) =>
  api.get(`${LAUNCHES}/${flightNumber}`);
