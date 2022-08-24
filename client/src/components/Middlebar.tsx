import React, { useState } from "react";

import MiddleBarComponent from "../components/MiddleBarComponent";
import SearchIcon from "@mui/icons-material/Search";
import Man from "../images/man.svg";

interface Props {
  displayRooms: any[];
  selectedMid: number;
  setSelectedMid: (selectedMidMid: number) => void;
}

const findName = (room: any) => {
  if (room.participants) {
    let participant;
    [participant] = room.participants.slice(-1);
    return participant.info.id;
  } else return room.subject;
};

const findTime = (time: Date) => {
  const time1: number = new Date().getTime();
  const time2: number = new Date(time).getTime();

  // get total seconds between the times
  var delta = Math.abs(time1 - time2) / 1000;

  return delta;
};

const MiddleBar = ({ selectedMid, setSelectedMid, displayRooms }: Props) => {
  const [docId, setDocId] = useState<string>("");

  return (
    <div className="px-10 py-12 bg-gray-350 min-h-screen flex flex-col justify-start">
      <div>
        <div className="flex gap-4 items-center rounded-lg mb-6">
          <div className="bg-white-gray-150 border border-gray-450 rounded-lg h-11 flex flex-row w-full">
            <div className="pl-4 py-2">
              <SearchIcon fontSize="medium" className="text-gray-750" />
            </div>
            <input
              className="bg-gray-100 h-8 my-auto mx-4 px-2 text-sm w-full"
              placeholder="Search Here"
              onChange={(e) => setDocId(e.target.value)}
            ></input>
          </div>
        </div>
      </div>

      <div>
        {displayRooms?.map((item, index) =>
          docId.length > 0 ? (
            docId === item._id && (
              <div key={index} onClick={() => setSelectedMid(index)}>
                <MiddleBarComponent
                  image={Man}
                  title={item.subject}
                  name={item.senderName}
                  time={findTime(item.updatedAt)}
                  content={item.content}
                  attachment={true}
                  selected={selectedMid === index ? true : false}
                />
              </div>
            )
          ) : (
            <div key={index} onClick={() => setSelectedMid(index)}>
              <MiddleBarComponent
                image={Man}
                title={item.subject}
                name={item.senderName}
                time={findTime(item.updatedAt)}
                content={item.content}
                attachment={true}
                selected={selectedMid === index ? true : false}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MiddleBar;
