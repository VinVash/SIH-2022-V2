import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { FilesContext } from "../../contexts/files.context";
import { Socket } from "socket.io-client";

import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

import Sidebar from "../../components/Sidebar";
import Middlebar from "../../components/Middlebar";
import PDFIcon from "../../components/PDFIcon";

import EditPen from "../../images/icons/newmessage_page_newpen.svg";
import Email1 from "../../images/tracking_page_email_1.png";
import Email2 from "../../images/tracking_page_email_2.png";
import Email3 from "../../images/tracking_page_email_3.png";
import Attach from "../../images/icons/newmessage_page_attach.svg";
import Photos from "../../images/icons/newmessage_page_photos.svg";
import Link from "../../images/icons/newmessage_page_link.svg";
import Send from "../../images/icons/newmessage_page_send.svg";

import { useMutateCreateDocument } from "../../queries/mutations";
import { useEmployeeInfo, useAdminInfo } from "../../queries/hooks";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  "private-message": (privatemessage: string) => void;
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

const baseUrl = "https://sih-2022-server.azurewebsites.net/api";

const Input = styled("input")({
  display: "none",
});

const NewMessage = ({ selected, setSelected, socketConnection }: Props) => {
  useEffect(() => {
    setSelected(-1);
  }, [setSelected]);

  const [selectedMid, setSelectedMid] = useState<number>(0);

  const { files, setFiles } = useContext(FilesContext);

  const [percentage, setPercentage] = useState(0);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Error[]>([]);
  const [name, setName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [receiverName, setReceiverName] = useState<string>("");
  var [emailContent, setEmailContent] = useState("");

  const selectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.currentTarget.files || []);

    let updatedFiles = [...files];

    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];

      var bodyFormData = new FormData();
      bodyFormData.append("photo", selectedFile);

      const options = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);

          if (percent <= 100) {
            setPercentage(percent);
          }
        },
      };

      setUploadLoader(true);
      const res = await axios.post(
        `${baseUrl}/uploadFile?filename=${selectedFile.name}`,
        bodyFormData,
        options
      );
      setUploadLoader(false);

      e.target.value = "";
      updatedFiles = [...updatedFiles, res.data.url];
      setFiles(updatedFiles);
      localStorage.setItem("files", JSON.stringify(updatedFiles)); // clear the localstorage when the createDocument api has been called.
    }
  };

  const employeeInfo = useEmployeeInfo({
    departmentId: localStorage.getItem("depId"),
    employeeId: localStorage.getItem("empId"),
  });

  const adminInfo = useAdminInfo({
    departmentId: localStorage.getItem("depId"),
    employeeId: localStorage.getItem("empId"),
  });

  useEffect(() => {
    if (
      employeeInfo.data !== undefined &&
      employeeInfo.data.message !== "Employee does not exist"
    ) {
      setName(
        employeeInfo.data?.employee?.firstName +
          " " +
          employeeInfo.data?.employee.lastName
      );
    }
  }, [employeeInfo.isFetched === true]);

  // useEffect(() => {
  //   if(adminInfo.data !== undefined) {
  //     setName(employeeInfo.data.)
  //   }
  // }, [adminInfo.isFetched === true]);

  const { mutateAsync: createDocumentData } = useMutateCreateDocument({
    onSuccess: (data: any) => {
      if (data.message === "Document created successfully") {
        setMessage(data.message);
        setLoading(false);
        localStorage.setItem("files", "");
        setFiles([]);
        setDepartment("");
        setSubject("");
        setTemplateName("");
        setEmailContent("");
        setMessage("");

        socketConnection.emit(
          "private-message",
          JSON.stringify({
            senderId: localStorage.getItem("empId"),
            content: emailContent,
            createdAt: new Date(),
            senderName: name,
            subject: subject,
            receiverId: data.data.permissions[data.data.permissions.length - 1],
            receiverName: data.data.assignedEmployeeName,
            documentId: data.data.documentId,
          })
        );
      } else {
        setErrors((errors: Error[]) => [
          ...errors,
          { type: "unknown", message: data.message },
        ]);
        setLoading(false);
      }
    },
    onError: () => {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "unknown", message: "Unknown error" },
      ]);
    },
    onMutate: () => {
      setLoading(true);
    },
  }) as unknown as { mutateAsync: (data: any) => Promise<any> };

  useEffect(() => {
    setTimeout(() => {
      setPercentage(0);
    }, 2000);
  }, [percentage === 100]);

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const hiddenPhotoInput = useRef<HTMLInputElement>(null);
  const hiddenLinkInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // switch (templateName) {
    if (templateName === "1 Casual Leave/Sick Leave/Leave") {
      setEmailContent(`Dear Sir/Ma'am,
Hope this message finds you well.
     
This is to request you to grant me a leave of absence on [date] of type [Casual Leave/Sick Leave/Leave Without Pay] due to [reason].
I shall be grateful to you for your kind consideration.
     
Thanking you,
[Your name]
[Your title]`);
    } else if (templateName === "2 or more Casual Leaves/Sick Leave(s)") {
      setEmailContent(`Dear Sir/Ma'am,
Hope this message finds you well.
        
This is to request you to grant me leaves of absence for [number of days] days from [start date] to [end date] of type [Casual Leave/Sick Leave/Leave Without Pay] due to [reason].
I shall be grateful to you for your kind consideration.
        
Thanking you,
[Your name]
[Your title]`);
    } else if (templateName === "1 Complementary Leave") {
      setEmailContent(`Dear Sir/Ma'am,
Hope this message finds you well.

This is to request you to grant me a Complementary Leave on [date] due to [reason].
Please check if I have enough Complementary Leave balance to avail this Leave.
I shall be grateful to you for your kind consideration.

Thanking you,
[Your name]
[Your title]`);
    } else if (templateName === "More than 1 Complementary Leaves") {
      setEmailContent(`Dear Sir/Ma'am,
Hope this message finds you well.

This is to request you to grant me Complementary Leaves for [number of days] days from [start date] to [end date] due to [reason].
Please check if I have enough Complementary Leave balance to avail this Leave.
I shall be grateful to you for your kind consideration.

Thanking you,
[Your name]
[Your title]`);
    } else if (templateName === "Budget Approval") {
      setEmailContent(`Dear Sir/Ma'am,
This is to inform you that I have prepared the budget for [department/project name]. It covers expenses for the coming [amount of time]. For your perusal, I have attached a copy herein.

At your convenience, I would appreciate it if you reviewed the budget. You can highlight any changes you would like made.

If there are none, please provide me with approval by [date] so I can have the budget implemented by the Accounts Department.

Thank you for your prompt action regarding this matter.

Sincerely,
[Your name]
[Your title]`);
    } else if (templateName === "Promotion with Transfer") {
      setEmailContent(`Greetings team [company name],

I am pleased to announce that [employee] is transferring to [department] to work in our team as our new [position].

During the [timeframe] that [employee] has worked with us, [he/she/they] has achieved [list achievements]. Some of [her/his/their] greatest achievements with us are [achievements].

[Employee] has taken great measures to ensure that our [employee's department] works flawlessly and I am sure that most of you value [employee]'s efforts just as much as we do.

We look forward to starting this new adventure. If you have any questions regarding this change, feel free to reply to this email.

Sincerely,
[Your name]
[Your title]`);
    } else if (templateName === "Welcome") {
      setEmailContent(`Hey [name]!

Welcome to [brand name]. We are happy to have you join our community.

[Brand name] goal is to create [add goal and/or mission of your brand].
We promise to only send you emails [add how many times per week you will be sending an email].
All our emails will offer valuable information to help you along your journey and we may occasionally recommend a product that we believe in.

We hope you enjoy your time with us and, in the meantime, feel free to check our [educational resources of your brand]

Yours,
[Brand name]`);
    } else if (templateName === "Sales") {
      setEmailContent(`Hi [Name],

I hope this email finds you well. Let me start by saying that I am a big fan of your work and it has inspired me to push myself beyond what I thought were my limits!

I am reaching out because [reason].

After taking a good look at [target company] I realize that you could improve in [improvement area]. I have helped many others improve in the same area and I‘d be more than happy to talk with you about it!

Would you be available for a quick call to discuss how our [product/service] could help you?

Regards,
[Name]`);
    } else if (templateName === "Follow Up") {
      setEmailContent(`Dear [name],

You are probably very busy, I totally understand that!

I'm writing to follow up on my latest email. I still haven‘t heard back from you and was wondering if you have had the time to consider my proposal.

It would be great to hear back from you. So, please let me know when you find some time.

Regards,
[Your name]`);
    } else if (templateName === "Meeting") {
      setEmailContent(`Hi [name],

In order to discuss [meeting's purpose] and to [other meeting objectives], a meeting has been scheduled.

I am looking forward to seeing you at [location], at [time] on [date].

Below you will find the agenda for our meeting:

[Meeting agenda]

If you cannot confirm your attendance or you have any uncertainties, please let me know.

Have a nice day!`);
    } else if (templateName === "Thank You") {
      setEmailContent(`Hi [name],

I just wanted to thank you once again for [action]. This helped me a lot with [problem].

I will keep you posted and, of course, let me know if there is anything you need help with.

Sincerely,

[Your name]`);
    } else if (templateName === "Reference") {
      setEmailContent(`Dear [name],

I am writing to recommend [recommended person]. [he/she] was working/studying with us here at [organization name] as a [position] for [period of time].

I am [your position] of [organization name] and [recommended person] worked with me on [projects].

During [his/hers] time here, [he/she] proved to have [skills/knowledge/ability]. I have always valued [qualities] amongst my [team/students] and [recommended person] never failed to deliver that.

I am sure that you would also find [recommended person] easy to work with.

If you have any questions please don't hesitate to contact me.

Kind regards,
[Your name]`);
    }
  }, [templateName]);

  const rooms: any[] = [];

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      <div className="w-1/4">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>
      <div className="flex flex-row w-full overflow-scroll">
        <div className="w-1/3">
          <Middlebar
            selectedMid={selectedMid}
            setSelectedMid={setSelectedMid}
            displayRooms={rooms}
          />
        </div>
        <div className="w-2/3 px-10 overflow-scroll">
          <h1 className="mt-12 text-base font-semibold tracking-normal text-gray-750">
            New Message
          </h1>
          <div className="flex flex-row items-center gap-2">
            <img src={EditPen} alt="edit" className="w-4 h-4" />
            <p className="font-normal italic font-sm text-gray-550">
              You can use template and update where ever necessary.
            </p>
          </div>

          <div className="mt-6">
            <Autocomplete
              disablePortal
              id="department-select"
              options={[
                "Sales",
                "HR",
                "IT",
                "Marketing",
                "Executive",
                "Finance",
              ]}
              size="small"
              value={department}
              onChange={(event: any, newValue: string | null) => {
                setDepartment(newValue as string);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Department" />
              )}
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <TextField
              id="subject"
              label="Subject"
              variant="outlined"
              size="small"
              value={subject}
              onChange={(event: any) => {
                setSubject(event.target.value);
              }}
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <Autocomplete
              disablePortal
              id="template-select"
              options={[
                "1 Casual Leave/Sick Leave/Leave",
                "2 or more Casual Leaves/Sick Leave(s)",
                "1 Complementary Leave",
                "More than 1 Complementary Leaves",
                "Budget Approval",
                "Promotion with Transfer",
                "Welcome",
                "Sales",
                "Follow Up",
                "Meeting",
                "Thank You",
                "Reference",
              ]}
              value={templateName}
              onChange={(event: any, newValue: string | null) => {
                setTemplateName(newValue as string);
              }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Select Template (Optional)" />
              )}
              className="w-full"
            />
          </div>

          <div className="mt-6">
            <div className="whitespace-pre-line font-normal text-base text-gray-750">
              <TextField
                id="outlined-multiline-flexible"
                label="Message"
                multiline
                rows={16}
                InputLabelProps={{
                  shrink: true,
                }}
                className="w-full"
                value={emailContent}
                onChange={(event: any) => {
                  setEmailContent(event.target.value);
                }}
              />
            </div>
            <div className="pt-4 flex flex-row gap-8">
              <img src={Email1} alt="" className="w-1/3" />
              <img src={Email2} alt="" className="w-1/3" />
              <img src={Email3} alt="" className="w-1/3" />
            </div>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-6">
              {files.map((item, index) => (
                <PDFIcon key={index} file={item} />
              ))}
            </div>
          </div>

          <div className={`${percentage > 0 ? "mt-20" : "mt-40"}`}>
            {percentage > 0 && (
              <LinearProgress variant="determinate" value={percentage} />
            )}
          </div>

          <div className="mt-20 mb-20 flex flex-row justify-between">
            <div className="flex flex-row gap-4">
              <label htmlFor="contained-button-file">
                <button
                  className="w-10 h-10 rounded-full bg-gray-350 border border-gray-450"
                  onClick={() => {
                    hiddenFileInput.current!.click();
                  }}
                >
                  <img src={Attach} alt="" className="w-5 h-5 mx-auto my-2" />
                </button>
                <Input
                  accept="application/pdf"
                  ref={hiddenFileInput}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={selectFile}
                />
              </label>

              <label htmlFor="contained-button-photo">
                <button
                  className="w-10 h-10 rounded-full bg-gray-350 border border-gray-450"
                  onClick={() => {
                    hiddenPhotoInput.current!.click();
                  }}
                >
                  <img src={Photos} alt="" className="w-5 h-5 mx-auto my-2" />
                </button>
                <Input
                  accept="image/jpeg,image/png"
                  ref={hiddenPhotoInput}
                  id="contained-button-photo"
                  multiple
                  type="file"
                  onChange={selectFile}
                />
              </label>

              <label htmlFor="contained-button-link">
                <button
                  className="w-10 h-10 rounded-full bg-gray-350 border border-gray-450"
                  onClick={() => {
                    hiddenLinkInput.current!.click();
                  }}
                >
                  <img src={Link} alt="" className="w-5 h-5 mx-auto my-2" />
                </button>
                <Input
                  accept="image/jpeg,image/png"
                  ref={hiddenLinkInput}
                  id="contained-button-link"
                  multiple
                  type="file"
                  onChange={selectFile}
                />
              </label>
            </div>

            <div className="w-24">
              <button
                className="bg-gradient-to-r from-blue-450 to-blue-150 text-gray-150 py-3 w-full rounded-lg font-medium flex flex-row gap-2 px-4"
                onClick={(e: React.MouseEvent<HTMLButtonElement> | any) => {
                  e.preventDefault();
                  createDocumentData({
                    employeeId: localStorage.getItem("empId"),
                    employee_name: name,
                    subject: subject,
                    description: emailContent,
                    main_file: JSON.parse(
                      localStorage.getItem("files") || "[]"
                    ),
                    reference_file: [], // currently no feature of reference files.
                    forwarding_dept: department.toLowerCase(),
                    category: templateName,
                  });
                }}
              >
                <img src={Send} alt="send" className="h-5 w-5" /> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMessage;

/* Sample Response:
{
  "message": "Document created successfully",
  "data": {
    "roomId": "62f53d3273beee1961db7bad",
    "main_file": [
      "https://sih2022server.blob.core.windows.net/documents/sample1.pdf",
      "https://sih2022server.blob.core.windows.net/documents/sample2.pdf",
      "https://sih2022server.blob.core.windows.net/documents/sample3.pdf",
      "https://sih2022server.blob.core.windows.net/documents/sample4.pdf"
    ],
    "reference_files": [],
    "permissions": [
      "A1"
    ],
    "status": [
      "Pending"
    ],
    "time_recieved": [
      "2022-08-11T17:32:33.902Z"
    ],
    "time_returned": [],
    "_id": "62f53d311d0f4588bfdbab7a",
    "documentId": "D1",
    "employeeId": "E1",
    "subject": "Budget Approval",
    "description": "Dear Sir/Ma'am,\nThis is to inform you that I have prepared the budget for [department/project name]. It covers expenses for the coming [amount of time]. For your perusal, I have attached a copy herein.\n\nAt your convenience, I would appreciate it if you reviewed the budget. You can highlight any changes you would like made.\n\nIf there are none, please provide me with approval by [date] so I can have the budget implemented by the Accounts Department.\n\nThank you for your prompt action regarding this matter.\n\nSincerely,\n[Your name]\n[Your title]",
    "category": "Budget Approval",
    "__v": 0
  }
}
*/
