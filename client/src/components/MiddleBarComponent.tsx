import React from "react";

import PaperClip from "../images/icons/middlebar_component_attach.svg";

export interface MiddleBarComponentProps {
  image: string;
  title: string;
  name: string;
  time: number;
  content: string;
  attachment: boolean; // make functionality for this.
  selected: boolean;
}

const getTimeInYearMonthDayMinutes = (num: number) => {
  const year = Math.floor(num / 31536000);
  num -= year * 31536000;
  const month = Math.floor((num % 31536000) / 2592000);
  num -= month * 2592000;
  // calculate (and subtract) whole days
  var days = Math.floor(num / 86400);
  num -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(num / 3600) % 24;
  num -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(num / 60) % 60;
  num -= minutes * 60;

  // Return the result as a string
  return `${
    year > 0
      ? year + "y "
      : month > 0
      ? month + "m "
      : days > 0
      ? days + "d "
      : (hours > 0 ? hours + "h " : "") + (minutes > 0 ? minutes + "m " : "")
  }ago`;
};

export default function MiddleBarComponent({
  image,
  title,
  name,
  time,
  content,
  attachment,
  selected,
}: MiddleBarComponentProps) {
  return (
    <div
      className={`bg-gradient-to-b from-blue-450 to-blue-150 rounded-lg cursor-pointer ${
        selected ? "pl-1 filter drop-shadow-blue" : "pl-0"
      }`}
    >
      <div className="bg-white px-4 py-4 mb-4 rounded-lg">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <img src={image} alt="man" className="w-10 h-10 rounded-full" />
            <div className="w-full">
              <h1 className="text-sm font-bold text-gray-750">
                {title}
                <span
                  className={`${attachment ? "visible" : "hidden"} float-right`}
                >
                  <img
                    src={PaperClip}
                    alt="attach-icon"
                    className="pl-2 pt-1"
                  />
                </span>
              </h1>
              <h1 className="text-sm font-normal text-gray-750">{name}</h1>
            </div>
          </div>

          <h1 className="text-sm font-normal text-gray-550">
            {getTimeInYearMonthDayMinutes(time)}
          </h1>
        </div>

        <h1 className="my-1 px-7 pl-12 text-sm font-normal text-gray-550 truncate">
          {content}
        </h1>
      </div>
    </div>
  );
}
