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
import { getStartAndEnd } from "./utils";

const itemsPerPage = 12;

const filterMapper = {
  all: "All Launches",
  upcoming: "Upcoming Launches",
  success: "Successful Launches",
  failure: "Failed Launches",
};

const dateFilterMapper = {
  lastTwoYear: "Last 2 Years",
  lastTwentyYear: "Last 20 Years",
  lastYear: "Last 1 Year",
  pastSixMonths: "Past 6 Months",
  lastFiveYear: "Last 5 Years",
  pastThreeMonths: "Past 3 Months",
};

export type Filter = "all" | "upcoming" | "success" | "failure";
export type DateFilter =
  | "lastTwoYear"
  | "lastYear"
  | "lastFiveYear"
  | "pastSixMonths"
  | "pastThreeMonths"
  | "lastTwentyYear"
  | "";

const Dashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateFilter, setDateFilter] = useState<DateFilter>(
    `${searchParams.get("range") || ""}` as DateFilter
  );
  const [filter, setFilter] = useState<Filter>(`${searchParams.get("filter") || "all"}` as Filter);
  const [launchesData, setLaunchesData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedRow, setSelectedRow] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = launchesData.length
    ? (filter === "all" ? launchesData : filteredData).slice(itemOffset, endOffset)
    : [];
  const pageCount = Math.ceil(
    (filter === "all" ? launchesData : filteredData).length / itemsPerPage
  );

  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % (filter === "all" ? launchesData : filteredData).length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getData();
  }, [dateFilter]);

  const getData = async () => {
    setLoading(true);
    const { start, end } = getStartAndEnd(dateFilter as DateFilter);
    console.log(dateFilter, start, end);
    const { data } = await getLaunchesData({ start: start || "", end: end || "" });
    setLaunchesData(data);
    setLoading(false);
  };

  const handleFiltering = () => {
    const data = launchesData.filter((elem: any) => {
      if (filter === "all") return true;
      if (filter === "success") return elem.launch_success;
      if (filter === "upcoming") return elem.upcoming;
      if (filter === "failure") return elem.launch_success === false;
    });
    setFilteredData(data);
  };

  useEffect(() => {
    handleFiltering();
  }, [filter, launchesData]);

  const handleFilterChange = (newFilter: string) => {
    setSearchParams((prevState) => {
      const range = prevState.get("range") as string;

      return { filter: newFilter, range };
    });
    setFilter(newFilter as Filter);
  };

  const handleRangeChange = (newRange: string) => {
    const { start, end } = getStartAndEnd(newRange as DateFilter);
    if (start && end) {
      setSearchParams((prevState) => {
        return { filter: prevState.get("filter") || ("all" as string), range: newRange };
      });
    }
    setDateFilter(newRange as DateFilter);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-12 w-full flex justify-between">
        <DropDownMenu
          title={dateFilter ? dateFilterMapper[dateFilter] : "Select Date Range"}
          leftIcon={<Calendar />}
          onClickHandler={handleRangeChange}
          options={[
            {
              value: "lastFiveYear",
              label: "Last 5 Years",
            },
            {
              value: "lastTwoYear",
              label: "Last 2 Years",
            },
            {
              value: "lastYear",
              label: "Last 1 Year",
            },
            {
              value: "lastTwentyYear",
              label: "Last 20 Years",
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
        length={currentItems.length}
        itemOffset={itemOffset}
        setSelectedRow={setSelectedRow}
        onOpen={onOpen}
        isLoading={loading}
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
