import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Man from "../../images/man.svg";
import ReceivedDashboardDark from "../../images/icons/received-dashboard-dark.svg";
import CompletedDashboardDark from "../../images/icons/completed-dashboard-dark.svg";
import PendingDashboardDark from "../../images/icons/pending-dashboard-dark.svg";
import RejectedDashboardDark from "../../images/icons/rejected-dashboard-dark.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Total",
      data: labels.map(() => Math.random() * 100),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Approved",
      data: labels.map(() => Math.random() * 100),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Pending",
      data: labels.map(() => Math.random() * 100),
      borderColor: "rgb(255, 205, 86)",
      backgroundColor: "rgba(255, 205, 86, 0.5)",
    },
    {
      label: "Rejected",
      data: labels.map(() => Math.random() * 100),
      borderColor: "rgb(225, 19, 32)",
      backgroundColor: "rgba(225, 19, 32, 0.5)",
    },
  ],
};

interface PeopleInterface {
  name: string;
  empCode: string;
  image: string;
  dep: string;
}

interface DashboardContentInterface {
  title: string;
  number: number;
  icon: string;
  status: string;
  statusNumber: number;
}

interface TableInterface {
  name: string;
  id: string;
  date: string;
  status: string;
  from: string;
  to: string;
}

const People: PeopleInterface[] = [
  {
    name: "John Doe",
    empCode: "EMP001",
    image: Man,
    dep: "IT",
  },
  {
    name: "Jane Doe",
    empCode: "EMP002",
    image: Man,
    dep: "IT",
  },
  {
    name: "Johannson Doe",
    empCode: "EMP003",
    image: Man,
    dep: "IT",
  },
];

const DashboardContent: DashboardContentInterface[] = [
  {
    title: "Email Received",
    number: 400,
    icon: ReceivedDashboardDark,
    status: "increase",
    statusNumber: 24,
  },
  {
    title: "Completed",
    number: 200,
    icon: CompletedDashboardDark,
    status: "increase",
    statusNumber: 34,
  },
  {
    title: "Pending",
    number: 70,
    icon: PendingDashboardDark,
    status: "same",
    statusNumber: 0,
  },
  {
    title: "Rejected",
    number: 130,
    icon: RejectedDashboardDark,
    status: "decrease",
    statusNumber: 27,
  },
];

const TableData: TableInterface[] = [
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Pending",
    from: "John Doe",
    to: "HR Department",
  },
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Approved",
    from: "HR Department",
    to: "",
  },
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Pending",
    from: "John Doe",
    to: "HR Department",
  },
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Approved",
    from: "HR Department",
    to: "",
  },
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Pending",
    from: "John Doe",
    to: "HR Department",
  },
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Approved",
    from: "HR Department",
    to: "",
  },
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Pending",
    from: "John Doe",
    to: "HR Department",
  },
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Rejected",
    from: "HR Department",
    to: "",
  },
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Pending",
    from: "John Doe",
    to: "HR Department",
  },
  {
    name: "Leave Application",
    id: "#12345",
    date: "Sunday, 10 July, 2022",
    status: "Approved",
    from: "HR Department",
    to: "",
  },
];

interface Props {
  selected: number;
  setSelected: (selected: number) => void;
}

export default function Dashboard({ selected, setSelected }: Props) {
  useEffect(() => {
    setSelected(8);
  }, [setSelected]);

  return (
    <div className="h-screen flex bg-gray-350 overflow-hidden">
      <div className="w-1/4">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>
      <div className="w-full py-12 px-10 overflow-scroll">
        <div>
          <p className="text-2xl font-medium text-gray-750">
            <span className="italic font-light text-gray-550">Hello,</span>{" "}
            Human Resource Department Admin
          </p>
          <p className="uppercase tracking-widest font-medium text-lg text-gray-650">
            Statistical Analysis
          </p>
        </div>
        <div className="mt-8 flex items-stretch justify-between gap-8">
          <div className="bg-white shadow-xl px-8 py-6 w-2/3 rounded-2xl">
            <Line options={options} data={data} />
          </div>
          <div className="w-1/3 bg-white shadow-xl rounded-2xl px-8 py-6">
            <p className="uppercase tracking-widest font-medium text-lg text-gray-650 mb-6">
              Top Performers
            </p>
            {People.map((person, index) => (
              <div
                className="flex items-center justify-between mt-4 border border-gray-450 p-4 rounded-2xl"
                key={index}
              >
                <div className="flex items-center">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="text-sm">
                    <p className="text-gray-750 font-medium">
                      {person.name}{" "}
                      <span className="italic text-gray-450 font-normal">
                        &nbsp; ( {person.empCode} )
                      </span>
                    </p>
                    <p className="text-gray-450 text-sm font-medium">
                      {person.dep}
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={solid("ellipsis-vertical")}
                  className="text-gray-450"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between gap-5">
          {DashboardContent.map((content, index) => (
            <div
              className="bg-white p-4 rounded-2xl shadow-xl mt-8 w-full"
              key={index}
            >
              <div className="flex items-start justify-between">
                <div className="text-sm">
                  <p className="text-gray-750 font-medium text-sm">
                    {content.title}
                  </p>
                  <p className="text-gray-850 font-semibold text-xl mt-1">
                    {content.number}
                  </p>
                </div>
                <img src={content.icon} alt="" />
              </div>
              <div className="flex items-center gap-1 mt-1">
                <p
                  className={`italic text-xs py-0.5 px-2 border-1/2 rounded-full ${
                    content.status === "increase"
                      ? "text-green-550 bg-green-150 border-green-550"
                      : content.status === "decrease"
                      ? "text-red-550 bg-red-150 border-red-550"
                      : "text-blue-350 bg-blue-25 border-blue-350"
                  }`}
                >
                  {content.status ? (
                    <FontAwesomeIcon
                      icon={
                        content.status === "increase"
                          ? solid("arrow-up")
                          : content.status === "decrease"
                          ? solid("arrow-down")
                          : solid("arrow-right")
                      }
                      className={`${
                        content.status === "increase"
                          ? "text-green-550"
                          : content.status === "decrease"
                          ? "text-red-550"
                          : "text-blue-350"
                      }`}
                    />
                  ) : null}{" "}
                  {content.statusNumber}%
                </p>
                <p
                  className={`italic text-xxs rounded-full ${
                    content.status === "increase"
                      ? "text-green-550"
                      : content.status === "decrease"
                      ? "text-red-550"
                      : "text-blue-350"
                  }`}
                >
                  From previous month
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-xl mt-8 w-full">
          <p className="uppercase tracking-widest text-gray-650 text-lg font-medium pt-6 pb-4 px-8">
            Latest Actions
          </p>
          <table className="w-full text-left border-collapse divide-y-1 divide-gray-450">
            <thead>
              <tr className="bg-gray-350 text-gray-650 uppercase tracking-wider">
                {["Name", "ID", "Date", "Status", "From", "To"].map(
                  (header, index) => (
                    <th
                      className={`${
                        index === 0 ? "px-8" : "px-4"
                      } py-4 text-sm font-medium`}
                      key={index}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y-1 divide-gray-450">
              {TableData.map((data, index) => (
                <tr key={index}>
                  <td className="pl-8 pr-4 py-4 text-sm text-gray-750 font-medium">
                    {data.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-550">{data.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-550">
                    {data.date}
                  </td>
                  <td
                    className={`px-4 py-4 text-sm font-medium 
                  ${
                    data.status === "Approved"
                      ? "text-green-550"
                      : data.status === "Rejected"
                      ? "text-red-550"
                      : "text-blue-350"
                  }`}
                  >
                    {data.status}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-550">
                    {data.from}
                  </td>
                  <td className="pr-8 pl-4 py-4 text-sm text-gray-550">
                    {data.to || "~"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
