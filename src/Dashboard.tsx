import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import DropDownMenu from "./components/DropDownMenu";
import Calendar from "./components/Icons/Calendar";
import Filter from "./components/Icons/Filter";
import LaunchDetailsModalBody from "./components/LaunchDetailsModalBody";
import { getLaunchesData } from "./services/common";
import LaunchesTable from "./components/LaunchesTable";

const itemsPerPage = 12;

const filterMapper = {
  all: "All Launches",
  upcoming: "Upcoming Launches",
  success: "Successful Launches",
  failure: "Failed Launches",
};

const dateFilterMapper = {
  lastTwoYear: "Last 2 Years",
  lastYear: "Last 1 Year",
  pastSixMonths: "Past 6 Months",
  pastThreeMonths: "Past 3 Months",
};

export type Filter = "all" | "upcoming" | "success" | "failure";
export type DateFilter = "lastTwoYear" | "lastYear" | "pastSixMonths" | "pastThreeMonths" | "";

const Dashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateFilter, setDateFilter] = useState<DateFilter>("");
  const [filter, setFilter] = useState<Filter>("all");
  const [launchesData, setLaunchesData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedRow, setSelectedRow] = useState<null | number>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = launchesData.length ? launchesData.slice(itemOffset, endOffset) : [];
  const pageCount = Math.ceil(launchesData.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % launchesData.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getLaunchesData();
    setLaunchesData(data);
  };

  const handleFilterChange = (newFilter: string) => setFilter(newFilter as Filter);

  const handleRangeChange = (newRange: string) => setDateFilter(newRange as DateFilter);

  // useEffect(() => {

  // }, [filter])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-12 w-full flex justify-between">
        <DropDownMenu
          title={dateFilter ? dateFilterMapper[dateFilter] : "Select Date Range"}
          leftIcon={<Calendar />}
          onClickHandler={handleRangeChange}
          options={[
            {
              value: "lastTwoYear",
              label: "Last 2 Years",
            },
            {
              value: "lastYear",
              label: "Last 1 Year",
            },
            {
              value: "pastSixMonths",
              label: "Past 6 Months",
            },
            {
              value: "pastThreeMonths",
              label: "Past 3 Months",
            },
          ]}
        />

        <DropDownMenu
          title={filterMapper[filter]}
          leftIcon={<Filter />}
          onClickHandler={handleFilterChange}
          options={[
            {
              value: "all",
              label: "All Launches",
            },
            {
              value: "upcoming",
              label: "Upcoming Launches",
            },
            {
              value: "success",
              label: "Successful Launches",
            },
            {
              value: "failure",
              label: "Failed Launches",
            },
          ]}
        />
      </div>

      <LaunchesTable
        length={launchesData.length}
        itemOffset={itemOffset}
        setSelectedRow={setSelectedRow}
        onOpen={onOpen}
        currentItems={currentItems}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="flex gap-1 justify-end my-2 select-none"
        nextClassName="border px-2 py-1 cursor-pointer"
        previousClassName="border px-2 py-1 cursor-pointer"
        pageClassName="border px-2 py-1"
        activeClassName="bg-secondary"
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LaunchDetailsModalBody flightNumber={selectedRow as number} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Dashboard;
