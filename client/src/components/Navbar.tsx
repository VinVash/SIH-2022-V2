import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center shadow-lg px-8 py-4 bg-gray-150">
      <FontAwesomeIcon icon={brands("google")} className="w-12 h-12" />
      <Link to="/sign-in">
        <div className="text-blue-250 font-bold rounded-lg border-blue-250 border-2 py-2 px-8 cursor-pointer">
          Sign In
        </div>
      </Link>
    </div>
  );
}
