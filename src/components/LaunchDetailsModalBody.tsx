import React, { useEffect, useState } from "react";
import { getLaunchDataByFlightNumber } from "../services/common";
import { formatTime } from "../utils";
import LaunchStatus from "./LaunchStatus";
import Loader from "./Loader";

type Props = {
  flightNumber: number;
};

const LaunchDetailsModalBody: React.FC<Props> = ({ flightNumber }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [launchDetails, setLaunchDetails] = useState<any>(null);

  const handleGetLaunchDetails = async () => {
    const { data } = await getLaunchDataByFlightNumber(flightNumber);
    setLaunchDetails(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    handleGetLaunchDetails();
  }, []);

  if (!flightNumber) return null;
  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex space-x-6 my-6">
        <div className={`w-18 h-18 object-contain overflow-hidden`}>
          <img className={`w-20 h-20 `} src={launchDetails?.links?.mission_patch_small} />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex space-x-4">
            <p className={`text-lg font-regular `}>{launchDetails?.mission_name}</p>
            {
              <LaunchStatus
                type={
                  launchDetails?.launch_success
                    ? "success"
                    : launchDetails?.launch_success == null
                    ? "upcoming"
                    : "failed"
                }
              >
                {launchDetails?.launch_success
                  ? "Success"
                  : launchDetails?.launch_success == null
                  ? "Upcoming"
                  : "Failed"}
              </LaunchStatus>
            }
          </div>
          <div className={`text-xs`}>{launchDetails?.rocket?.rocket_name}</div>
          <div className="flex space-x-2 items-center justify-start">
            <div className="w-4 h-4 object-contain overflow-hidden">
              <a href={launchDetails?.links?.nasa} target="_blank">
                <img
                  className="w-full h-full"
                  src="http://www.newdesignfile.com/postpic/2015/12/website-icon_342655.png"
                />
              </a>
            </div>
            <div className="w-4 h-4 object-contain overflow-hidden">
              <a href={launchDetails?.links?.wikipedia} target="_blank">
                <img
                  className="w-full h-full"
                  src="https://cdn.onlinewebfonts.com/svg/img_436022.png"
                />
              </a>
            </div>
            <div className="w-4 h-4  overflow-hidden">
              <a href={launchDetails?.links?.youtube} target="_blank">
                <img
                  className="w-full h-full"
                  src="https://www.freeiconspng.com/uploads/youtube-logo-png-hd-14.png"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p style={{ lineHeight: "24px" }} className={`text-sm my-4 font-regular`}>
        {launchDetails?.details}

        <a
          className="font-medium text-blue-500"
          href={launchDetails?.links?.wikipedia}
          target="_blank"
        >
          Wikipedia
        </a>
      </p>
      <div className="flex flex-col divide-y divide-primary text-sm">
        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Flight Number</span>
          <span className={`font-regular `}>{flightNumber}</span>
        </div>

        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Mission Name</span>
          <span className={`font-regular`}>{launchDetails?.mission_name}</span>
        </div>
        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Rocket Type</span>
          <span
            className={`font-regular capitalize ${isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""}`}
          >
            {launchDetails?.rocket?.rocket_type}
          </span>
        </div>
        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Rocket Name</span>
          <span className={`font-regular ${isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""}`}>
            {launchDetails?.rocket?.rocket_name}
          </span>
        </div>
        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Manufacturer</span>
          <span className={`font-regular ${isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""}`}>
            {launchDetails?.rocket.second_stage.payloads[0].manufacturer}
          </span>
        </div>
        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Nationality</span>
          <span className={`font-regular ${isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""}`}>
            {launchDetails?.rocket.second_stage.payloads[0].nationality}
          </span>
        </div>
        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Launch Date</span>
          <span className={`font-regular`}>{formatTime(launchDetails?.launch_date_utc)}</span>
        </div>
        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Payload Type</span>
          <span className={`font-regular ${isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""}`}>
            {launchDetails?.rocket.second_stage.payloads[0].payload_type}
          </span>
        </div>
        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Orbit</span>
          <span className={`font-regular ${isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""}`}>
            {launchDetails?.rocket.second_stage.payloads[0].orbit}
          </span>
        </div>
        <div className="flex py-4 space-x-5">
          <span className="w-1/3">Launch Site</span>
          <span className={`font-regular ${isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""}`}>
            {launchDetails?.launch_site.site_name}
          </span>
        </div>
      </div>
    </>
  );
};

export default LaunchDetailsModalBody;
