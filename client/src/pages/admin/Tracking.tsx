import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";

import SearchIcon from "@mui/icons-material/Search";
import Target from "../../images/icons/tracking_page_target.svg";
import GreenTick from "../../images/icons/tracking_page_green_tick.svg";
import Clock from "../../images/icons/tracking_page_clock.svg";
import TimelineComponent from "../../components/TimelineComponent";
import Email1 from "../../images/tracking_page_email_1.png";
import Email2 from "../../images/tracking_page_email_2.png";
import Email3 from "../../images/tracking_page_email_3.png";

enum Status {
  Pending = "Pending",
  Forwarded = "Forwarded",
  Rejected = "Rejected",
  Approved = "Approved",
}

const emailContent = `
To
The Manager
Hero Moto Corp.

Subject: One day leave application

Respected Sir/Ma'am,

I am writing this to inform you that I will be taking leave on ____ (date) as I have to _____ (mention reasons like attending a wedding, visit a friend, attending a seminar or event, etc.). I have completed all my tasks for the day and would be in touch with my team members if my assistance is required anytime.

Thank you.

Yours Sincerely,
John Doe
`;

interface Props {
  selected: number;
  setSelected: (selected: number) => void;
}

const Tracking = ({ selected, setSelected }: Props) => {
  useEffect(() => {
    setSelected(9);
  }, [setSelected]);

  return (
    <div className="h-screen flex bg-gray-350 overflow-hidden">
      <div className="w-1/4">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>
      <div className="w-full px-10 overflow-scroll">
        <h1 className="mt-12 text-lg font-medium tracking-widest">TRACKING</h1>

        <div className="bg-white h-screen rounded-2xl mt-8 shadow-xl px-12 py-8 mb-12">
          <div className="bg-gray-150 border border-gray-450 rounded-lg h-11 flex flex-row">
            <div className="pl-4 py-2">
              <SearchIcon fontSize="medium" className="text-gray-750" />
            </div>
            <input
              className="bg-gray-150 mx-4 px-2 text-sm w-full"
              placeholder="Enter Tracking ID"
            ></input>
          </div>

          <div className="pt-12 flex flex-row">
            {/*Timeline Content*/}
            <div className="w-2/5">
              <h1 className="text-gray-750 text-sm font-bold tracking-widest">
                TRACKING ID
              </h1>
              <div className="flex flex-row pt-4 items-center gap-2">
                <img src={Target} alt="" className="w-4 h-4" />
                <h1 className="text-base font-medium text-gray-650">
                  #43210, <span className="text-sm">John Doe</span>
                </h1>
              </div>
              <div className="flex flex-row pt-1 items-center gap-2">
                <img src={Clock} alt="" className="w-4 h-4" />
                <h1 className="text-xs font-medium text-gray-550">
                  11:30 PM, 11 July, 2022 (Monday)
                </h1>
              </div>

              <h1 className="text-gray-750 text-sm font-bold tracking-widest pt-8">
                CURRENT STATUS
              </h1>
              <div className="flex flex-row pt-4 items-center gap-2">
                <img src={GreenTick} alt="" className="w-4 h-4" />
                <h1 className="text-base font-medium text-green-550">
                  Approved{" "}
                  <span className="text-sm text-gray-650">
                    by Mr. Venkatesh Iyer
                  </span>
                </h1>
              </div>
              <div className="flex flex-row pt-1 items-center gap-2">
                <img src={Clock} alt="" className="w-4 h-4" />
                <h1 className="text-xs font-medium text-gray-550">
                  1:30 PM, 11 July, 2022 (Monday)
                </h1>
              </div>

              <h1 className="text-gray-750 text-sm font-bold tracking-widest pt-8 pb-4">
                TRACKING
              </h1>

              <TimelineComponent
                index={1}
                name="Mr. Parmish Verma"
                time="12:30 PM"
                date="11 July, 2022 (Monday)"
                status={Status.Forwarded}
                remarks="Bla Bla Bla"
              />
              <TimelineComponent
                index={2}
                name="Mr. Raghuram Rajan"
                time="1:30 PM"
                date="11 July, 2022 (Monday)"
                status={Status.Forwarded}
                remarks="Bla Bla Bla"
              />
              <TimelineComponent
                index={3}
                name="Mr. Venkatesh Iyer"
                time="2:30 PM"
                date="11 July, 2022 (Monday)"
                status={Status.Approved}
              />
            </div>

            {/*Email Content*/}
            <div className="w-3/5 border-l-2 border-gray-350 px-12">
              <h1 className="text-gray-750 text-sm font-bold tracking-widest">
                EMAIL CONTENT
              </h1>
              <div className="pt-4 items-center whitespace-pre-line font-normal text-sm text-gray-750">
                {emailContent}
              </div>
              <div className="pt-4 flex flex-row gap-8">
                <img src={Email1} alt="" className="w-1/3" />
                <img src={Email2} alt="" className="w-1/3" />
                <img src={Email3} alt="" className="w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
