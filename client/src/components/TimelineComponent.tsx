import React from "react";
import ForwardArrow from '../images/icons/tracking_page_forward_arrow.svg';
import GreenTick from '../images/icons/tracking_page_green_tick.svg';
import Rejected from '../images/icons/tracking_page_rejected.svg';
import Pending from '../images/icons/tracking_page_pending.svg';

export interface TimelineComponentProps {
  index: number;
  name: string;
  time: string;
  date: string;
  status: string; // forwarded, rejected, etc.
  remarks?: string; // remarks may not be there in case of status == Approved.
}

enum Status {
  Pending = "Pending",
  Forwarded = "Forwarded",
  Rejected = "Rejected",
  Approved = "Approved",
}

export default function TimelineComponent({ index, name, time, date, status, remarks }: TimelineComponentProps) {

  return (
    <div>
      <div className='flex flex-row items-center gap-2'>
        <div className="w-5 h-5 rounded-full bg-blue-150"><h1 className='text-xs text-white text-center py-0.5'>{index}</h1></div>
        <h1 className='text-xs text-gray-650 font-medium'>{name}</h1>
      </div>
      <div className={` ${status !== Status.Approved && status !== Status.Rejected && `border-l-1 border-gray-450` } h-16 ml-2`}>
        <h1 className='text-xxs font-normal text-gray-550 pl-5'>{`${time}, ${date}`}</h1>
        
        { status === Status.Approved &&
          <div className="flex flex-row gap-1 items-center pl-5">
            <h1 className='text-sm font-medium text-green-550'>{status}</h1>
            <img // change the icon according to status.
              src={GreenTick}
              alt=""
              className="w-3 h-3"
            />
          </div>
        }
        { status === Status.Forwarded &&
          <div className="flex flex-row gap-1 items-center pl-5">
            <h1 className='text-sm font-medium text-blue-350'>{status}</h1>
            <img // change the icon according to status.
              src={ForwardArrow}
              alt=""
              className="w-3 h-3"
            />
          </div>
        }
        {
          status === Status.Pending &&
          <div className="flex flex-row gap-1 items-center pl-5">
            <h1 className='text-sm font-medium text-gray-650'>{status}</h1>
            <img // change the icon according to status.
              src={Pending}
              alt=""
              className="w-3 h-3"
            />
          </div>
        }
        {
          status === Status.Rejected &&
          <div className="flex flex-row gap-1 items-center pl-5">
            <h1 className='text-sm font-medium text-red-550'>{status}</h1>
            <img // change the icon according to status.
              src={Rejected}
              alt=""
              className="w-3 h-3"
            />
          </div>
        }

      {/*Remove remarks if status="Approved"*/}
        { status !== Status.Approved && status !== Status.Pending &&
          <h1 className='text-xxs font-medium text-gray-650 pl-5'>Remarks: <span className='font-normal test-gray-550'></span>{remarks}</h1>
        }
      </div>
    </div>
  );
}
