import React from "react";
import ChatWithUs from "../images/chatWithUs.svg";

export default function Footer() {
  return (
    <div>
      <div
        className="flex justify-between items-center py-16 px-32 mt-32 mx-32 rounded-4xl bg-cover bg-center bg-no-repeat shadow-2xl relative border-2 border-gray-350"
        style={{ backgroundImage: `url(${ChatWithUs})` }}
      >
        <h1 className="text-4xl text-gray-750 font-semibold">
          Wanna Have A Discussion ?
        </h1>
        <button className=" bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-8 py-2 text-xl font-medium rounded-lg">
          Chat With Us
        </button>
      </div>
      <div className="pt-28 pb-8 -mt-20 bg-gray-750 text-center text-white tracking-wide">
        <p>
          Faster, Better, and Smoother. Made with &hearts; by the team Coders
          Royale
        </p>
      </div>
    </div>
  );
}
