import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import Work from "../images/Work.svg";

export default function SideBg() {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <FontAwesomeIcon icon={brands("google")} className="w-8 h-8" />
        <p className="text-xl text-gray-550 font-medium">Document Manager</p>
      </div>
      <p className="text-4xl text-gray-750 font-semibold mt-4">
        Digital Document Management Website for In Office and Remote Teams.
      </p>
      <img src={Work} alt="" className="w-4/5 mt-16" />
    </div>
  );
}
