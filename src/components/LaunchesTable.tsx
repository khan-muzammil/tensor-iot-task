import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { formatTime } from "../utils";
import LaunchStatus from "./LaunchStatus";
import Loader from "./Loader";

type Props = {
  length: number;
  itemOffset: number;
  setSelectedRow: (flightNumber: number) => void;
  onOpen: () => void;
  currentItems: any;
};

const LaunchesTable: React.FC<Props> = ({
  length,
  itemOffset,
  currentItems,
  setSelectedRow,
  onOpen,
}) => {
  return (
    <TableContainer className="rounded-md border border-primary mt-6">
      <Table variant="unstyled">
        <Thead className="bg-primary">
          <Tr>
            {[
              "No:",
              "Launched (UTC)",
              "Location",
              "Mission",
              "Orbit",
              <p className="text-center">Launch Status</p>,
              "Rocket",
            ].map((elem) => (
              <Th key={elem as string}>{elem}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="text-center text-sm text-primary">
          {length ? (
            currentItems.map((elem: any, idx: number) => (
              <Tr
                key={idx}
                onClick={() => {
                  setSelectedRow(elem.flight_number);
                  onOpen();
                }}
                className="cursor-pointer"
              >
                <Td>{itemOffset + idx + 1}</Td>
                <Td>{formatTime(elem.launch_date_utc)}</Td>
                <Td>{elem.launch_site.site_name}</Td>
                <Td>{elem.mission_name}</Td>
                <Td>{elem.rocket.second_stage.payloads[0].orbit}</Td>
                <Td>
                  <LaunchStatus
                    type={
                      elem.launch_success
                        ? "success"
                        : elem.launch_success == null
                        ? "upcoming"
                        : "failed"
                    }
                  >
                    {elem.launch_success
                      ? "Success"
                      : elem.launch_success == null
                      ? "Upcoming"
                      : "Failed"}
                  </LaunchStatus>
                </Td>
                <Td>{elem.rocket.rocket_name}</Td>
              </Tr>
            ))
          ) : (
            <Tr className="h-96">
              <Td colSpan={12} className="w-full">
                <Loader />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default LaunchesTable;
