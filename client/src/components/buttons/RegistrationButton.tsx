import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

export interface SignInButtonProps {
  text: string;
  toUrl: string;
}

export default function RegistrationButton({ toUrl, text }: SignInButtonProps) {
  return (
    <div>
      <button className="bg-gradient-to-r from-blue-450 to-blue-150 text-white py-2 w-full rounded-lg font-semibold">
        {text}
      </button>
    </div>
  );
}
