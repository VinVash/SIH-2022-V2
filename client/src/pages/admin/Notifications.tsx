import React from "react";
import Sidebar from "../../components/Sidebar";

import SearchIcon from "@mui/icons-material/Search";
import Man from "../../images/man.svg";

interface NotificationContent {
  sender: string;
  title: string;
  comment: string;
  time: string;
}

const notificationContent1: NotificationContent[] = [
  {
    sender: "John Doe",
    title: "Leave Application",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis sit iaculis gravida amet, ma ... ",
    time: "Just Now",
  },
  {
    sender: "John Doe",
    title: "Leave Application",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis sit iaculis gravida amet, ma ... ",
    time: "30 minutes ago",
  },
  {
    sender: "John Doe",
    title: "Leave Application",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis sit iaculis gravida amet, ma ... ",
    time: "1 hour ago",
  },
];

interface Props {
  selected: number;
  setSelected: (selected: number) => void;
}

const Notifications = ({ selected, setSelected }: Props) => {
  return (
    <div className="h-screen flex bg-gray-350 overflow-hidden">
      <div className="w-1/4">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>
      <div className="w-full px-10 overflow-scroll">
        <h1 className="mt-12 mb-8 text-lg font-medium tracking-widest">
          NOTIFICATIONS
        </h1>

        {notificationContent1.map((item, index) => (
          <div className="bg-white h-18 rounded-2xl mb-4 shadow-xl px-8 py-4" key={index}>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-4 items-center">
                <img src={Man} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <h1 className="text-sm font-light text-gray-750">
                    <span className="font-medium">
                      {notificationContent1[0].sender}
                    </span>{" "}
                    sent a mail titled{" "}
                    <span className="font-medium">
                      {notificationContent1[0].title}
                    </span>{" "}
                    to be approved.
                  </h1>
                  <h1 className="text-sm font-medium text-gray-550">
                    {notificationContent1[0].comment}
                  </h1>
                </div>
              </div>

              <h1 className="font-medium text-sm text-gray-450">{item.time}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
