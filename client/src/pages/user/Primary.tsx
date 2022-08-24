import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { useLoadMessages } from "../../queries/hooks";
import { useEmployeeInfo, useAdminInfo } from "../../queries/hooks";

import Sidebar from "../../components/Sidebar";
import Middlebar from "../../components/Middlebar";
import PDFIcon from "../../components/PDFIcon";

import Send from "../../images/icons/newmessage_page_send.svg";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import EmailContent from "../../components/EmailContent";
import Loader from "../../components/Loader";

interface ServerToClientEvents {
  noArg: () => void;
  "private-message": (privateMessageData: {
    senderId: string;
    content: string;
    createdAt: Date;
    senderuserName: string;
    subject: string;
  }) => void;
}

interface ClientToServerEvents {
  register: (userIdName: string) => void;
}

interface Props {
  selected: number;
  setSelected: (selected: number) => void;
  socketConnection: Socket<ServerToClientEvents, ClientToServerEvents>;
}

interface Error {
  type: string;
  message: string;
}

const Primary = ({ selected, setSelected, socketConnection }: Props) => {
  useEffect(() => {
    setSelected(0);
  }, [setSelected]);

  const [selectedMid, setSelectedMid] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Error[]>([]);
  const [name, setName] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [emailContent, setEmailContent] = useState({});

  const receivedMessages = useLoadMessages({
    employeeId: localStorage.getItem("empId"),
    pageNo: 1,
    filter: "primary",
  });

  useEffect(() => {
    if (receivedMessages.data) {
      setMessages(receivedMessages.data.data);
    }
  }, [receivedMessages.isSuccess === true]);

  const employeeInfo = useEmployeeInfo({
    employeeId: localStorage.getItem("empId"),
    departmentId: localStorage.getItem("depId"),
  });

  const adminInfo = useAdminInfo({
    employeeId: localStorage.getItem("empId"),
    departmentId: localStorage.getItem("depId"),
  });

  useEffect(() => {
    if (
      employeeInfo.data !== undefined &&
      localStorage.getItem("empId")![0] === "E"
    ) {
      socketConnection.emit(
        "register",
        JSON.stringify({
          userId: localStorage.getItem("empId"),
        })
      );
    }
  }, [employeeInfo.isFetched === true]);

  useEffect(() => {
    if (
      adminInfo.data !== undefined &&
      localStorage.getItem("empId")![0] === "A"
    ) {
      socketConnection.emit(
        "register",
        JSON.stringify({
          userId: localStorage.getItem("empId"),
        })
      );
    }
  }, [adminInfo.isFetched === true]);

  useEffect(() => {
    socketConnection.on("private-message", (data) => {
      const { senderId, content, createdAt, senderuserName, subject } = data;
      setMessages((messages) => [
        { senderId, content, createdAt, senderuserName, subject },
        ...messages,
      ]);
    });
  }, []);

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden">
      <div className="w-1/5">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>
      <div className="flex w-4/5">
        <div className="w-1/3 overflow-scroll">
          <Middlebar
            selectedMid={selectedMid}
            setSelectedMid={setSelectedMid}
            displayRooms={messages}
          />
        </div>
        <div className="w-2/3 overflow-scroll">
          {messages?.length > 0 ? (
            <EmailContent
              selectedMid={selectedMid}
              setSelectedMid={setSelectedMid}
              type="primary"
              emailContent={messages[selectedMid]}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Primary;
