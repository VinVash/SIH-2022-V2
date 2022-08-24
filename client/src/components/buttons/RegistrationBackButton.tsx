import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

export interface SignInButtonProps {
  toUrl: string;
}

export default function RegistrationBackButton({ toUrl }: SignInButtonProps) {
  return (
    <div className="mt-8 mb-2">
      <Link
        to={toUrl}
        className="text-gray-450 flex items-center gap-1 text-xs"
      >
        <FontAwesomeIcon icon={solid("angle-left")} />
        <div>Back</div>
      </Link>
    </div>
  );
}
