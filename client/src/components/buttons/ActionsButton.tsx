import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export interface ActionsButtonProps {
  bgColor: string;
  textColor: string;
  borderColor: string;
  text: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ActionsButton({
  bgColor,
  textColor,
  borderColor,
  text,
  isOpen,
  setIsOpen,
}: ActionsButtonProps) {
  const [toPerson, setToPerson] = useState("");
  const [remarks, setRemarks] = useState("");
  return (
    <>
      <div className="w-full">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`rounded-md ${bgColor} ${textColor} ${borderColor} border-1 w-full text-center py-1.5 text-sm font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          {text}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white py-8 px-16 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className={`text-lg font-semibold text-center font-xl tracking-widest uppercase leading-6 ${textColor}`}
                  >
                    {text}
                  </Dialog.Title>
                  <div className="mt-4">
                    {text === "Forward" ? (
                      <div className="mb-4">
                        <Autocomplete
                          disablePortal
                          id="department-select"
                          options={[
                            "Employee 1",
                            "Employee 2",
                            "Employee 3",
                            "Employee 4",
                            "Employee 5",
                            "Employee 6",
                            "Employee 7",
                            "Employee 8",
                            "Employee 9",
                            "Employee 10",
                          ]}
                          size="small"
                          value={toPerson}
                          onChange={(event: any, newValue: string | null) => {
                            setToPerson(newValue as string);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="To" />
                          )}
                          className="w-full"
                        />
                      </div>
                    ) : null}

                    <TextField
                      id="outlined-multiline-static"
                      label="Remarks"
                      multiline
                      rows={4}
                      className="w-full"
                      placeholder="Write something..."
                    />
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className={`rounded-md ${bgColor} ${textColor} ${borderColor} border-1 w-1/2 text-center py-1.5 text-sm font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      {text}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
