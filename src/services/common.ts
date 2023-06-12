import { api } from "./apiClient";
import { LAUNCHES } from "./constants";

export const getLaunchesData = () => api.get(LAUNCHES);

export const getLaunchDataByFlightNumber = (flightNumber: number) =>
  api.get(`${LAUNCHES}/${flightNumber}`);
