import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Homepage_1 from "../images/homepage_1.svg";
import Homepage_2 from "../images/homepage_2.svg";
import SliderLeft from "../images/homepage_slider_left.svg";
import SliderRight from "../images/homepage_slider_right.svg";
import Preview from "../images/preview.svg";
import Speed from "../images/speed.svg";
import approveDark from "../images/icons/approve-dark.svg";
import pendingDark from "../images/icons/pending-dark.svg";
import primaryDark from "../images/icons/primary-dark.svg";
import rejectDark from "../images/icons/reject-dark.svg";
import sendDark from "../images/icons/send-dark.svg";
import stackWhite from "../images/icons/stack-white.svg";
import storageWhite from "../images/icons/storage-white.svg";
import approveWhite from "../images/icons/approve-white.svg";
import hourglassWhite from "../images/icons/hourglass-white.svg";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import Footer from "../components/Footer";

const Homepage: React.FC = () => {
  const [selected, setSelected] = useState(0);

  const title: string[] = [
    "Primary",
    "Sent",
    "Approved",
    "Rejected",
    "Pending",
  ];

  interface SliderProps {
    text: string;
    icon: string;
  }

  interface Cards {
    blue: string;
    gray: string;
    icon: string;
    content: string;
  }

  const desc: SliderProps[] = [
    {
      text: "Keep the list of all the mails you received from the office.",
      icon: primaryDark,
    },

    {
      text: "Keep the track of all the mails you sent to the office.",
      icon: sendDark,
    },
    {
      text: "Stores all the mails that got approved from the office.",
      icon: approveDark,
    },
    {
      text: "Stores all the mails that got rejected from the office.",
      icon: rejectDark,
    },
    {
      text: "Stores all the mails that got sent and are in process in the the office.",
      icon: pendingDark,
    },
  ];

  const cards: Cards[] = [
    {
      blue: "10000",
      gray: "Papers",
      icon: stackWhite,
      content:
        "Roughly 70% of office waste is paper waste. In total an average office worker uses 10000 pages per year.",
    },
    {
      blue: "Unlimited",
      gray: "Storage",
      icon: storageWhite,
      content:
        "Feel free to share even large files with unlimited storage. Never stop yourself because of space to store.",
    },
    {
      blue: "5 - 10",
      gray: "Days",
      icon: approveWhite,
      content:
        "Fastest speed to sign digitally a document using Technology, Machine learning and a lot of research on office problems.",
    },
    {
      blue: "528",
      gray: "Hours",
      icon: hourglassWhite,
      content:
        "A study by Xerox found that businesses can save 528 hours per employee per year  by digitizing things.",
    },
  ];

  return (
    <div className="font-gray-150">
      <Navbar />
      <div className="grid grid-cols-5 gap-16 px-16 mt-16 items-center">
        <div className="col-span-2">
          <h1 className="text-6xl font-medium text-gray-850">
            A digital way of managing documents
          </h1>
          <p className="mt-4 font-medium text-xl text-gray-750">
            Get things done faster with a new Document Manager. Inbuilt file
            tracker for transparency. Do more with email templates and a fresh
            UI.
          </p>
          <button className="mt-6 bg-gradient-to-r from-blue-450 to-blue-150 text-white py-2 px-8 rounded-lg font-medium text-lg">
            Let's Go !!!
          </button>
        </div>
        <div className="col-span-3">
          <img src={Homepage_1} alt="homepage" className="mx-auto w-full" />
        </div>
      </div>

      <div className="px-32 mt-40 w-full absolute">
        <div className="grid grid-cols-5 gap-12 text-center px-12 -mb-6">
          {title.map((item, index) => (
            <div
              key={index}
              className={`col-span-1 p-3.5 content-center rounded-lg text-lg font-medium cursor-pointer border-2 border-gray-750 ${
                index === selected
                  ? "bg-gray-750 text-gray-150"
                  : "bg-gray-150 text-gray-750 hover:bg-gray-350 transition-all"
              }`}
              onClick={() => setSelected(index)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-xl border-2 border-gray-750 bg-white">
          <div className="flex items-center justify-between gap-16 pt-24 pb-16 px-24">
            <p className="text-2xl text-gray-750">{desc[selected].text}</p>
            <img src={desc[selected].icon} alt="homepage-2" className="w-24" />
          </div>
        </div>
      </div>

      <div
        className="px-32 pt-80 pb-120 mt-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Homepage_2})` }}
      >
        <p className="px-48 text-5xl text-white font-semibold text-center italic mb-16">
          We help reduce time delay and scale up productivity in government
          offices.
        </p>
        <ReactCompareSlider
          itemOne={<ReactCompareSliderImage src={SliderLeft} alt="Left" />}
          itemTwo={<ReactCompareSliderImage src={SliderRight} alt="Right" />}
        />
      </div>

      <div className="px-32 -mt-24">
        <p className="text-center text-4xl font-semibold text-gray-750">
          Why Document Manager ?
        </p>
        <div className="grid grid-cols-4 mt-16 divide-x-2 divide-gray-450 divide-dashed">
          {cards.map((item, index) => (
            <div
              className="col-span-1 flex flex-col items-center px-6 text-lg"
              key={index}
            >
              <div className="bg-gray-750 p-6 rounded-full">
                <img
                  src={item.icon}
                  alt="homepage-2"
                  className="text-white w-16 h-16"
                />
              </div>
              <div className="flex flex-col items-center text-3xl my-4 font-medium">
                <p className="text-blue-250">{item.blue}</p>
                <p className="text-gray-750">{item.gray}</p>
              </div>

              <p className="text-gray-650 text-center text-lg">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-750 pt-32 pb-28 mt-32">
        <div className="lg:flex lg:flex-row ml-32 items-center">
          <p className="text-white text-6xl lg:text-7xl xl:text-8xl font-bold">
            One place for all your work.
          </p>
          <img
            src={Preview}
            alt="preview"
            className="w-full lg:w-4/5 float-right"
          />
        </div>
      </div>

      <div className="mt-32 px-64 flex flex-col items-center">
        <img src={Speed} alt="speed" />
        <h1 className="text-5xl text-center font-semibold text-gray-750 mt-8">
          Experience The Speed
        </h1>
        <h1 className="text-2xl text-center font-semibold text-gray-650 mt-6">
          Paperless. Fast. Smooth.
        </h1>
        <h1 className="text-xl text-center mt-4 text-gray-550">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim nulla
          ultrices praesent sed nisl velit est eget.
        </h1>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
