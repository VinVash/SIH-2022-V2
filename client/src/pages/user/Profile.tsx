import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import { useEmployeeInfo, useAdminInfo } from "../../queries/hooks";

import TextField from "@mui/material/TextField";
import RegistrationButton from "../../components/buttons/RegistrationButton";
import Dp from "../../images/profile_page_dp.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Select from "@mui/material/Select";
import Loader from "../../components/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Face, Upload } from "@mui/icons-material";

interface Props {
  selected: number;
  setSelected: (selected: number) => void;
}

interface Error {
  type: string;
  message: string;
}

const Profile = ({ selected, setSelected }: Props) => {
  useEffect(() => {
    setSelected(7);
  }, [setSelected]);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [employeeCode, setEmployeeCode] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [dob, setDob] = useState<Date | string | null>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [officeBranch, setOfficeBranch] = useState<string>("");
  const [line1, setLine1] = useState<string>("");
  const [line2, setLine2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [match, setMatch] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);
  const [errorsChangePassword, setErrorsChangePassword] = useState<Error[]>([]);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  const [profileUpdateMessage, setProfileUpdateMessage] = useState("");
  const [file, setFile] = useState<any>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [updated, setUpdated] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const params = useParams();
  var image = "";

  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setEmployeeCode("");
    setDepartment("");
    setDob("");
    setMobileNo("");
    setOfficeBranch("");
    setLine1("");
    setLine2("");
    setCity("");
    setState("");
    setGender("");
  };

  var errLength = 0;
  var errLengthChangePassword = 0;

  const validate = () => {
    errLength = 0;
    setErrors([]);

    if (firstName === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "firstName", message: "First Name is required" },
      ]);
      errLength++;
    }

    if (lastName === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "lastName", message: "Last Name is required" },
      ]);
      errLength++;
    }

    if (emailId === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "emailId", message: "Email is required" },
      ]);
      errLength++;
    }
    if (
      emailId.length > 0 &&
      emailId.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null
    ) {
      setErrors((errors: Error[]) => [
        ...errors,
        {
          type: "emailId",
          message: "Must be a valid email",
        },
      ]);
      errLength++;
    }

    if (mobileNo === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "mobileNo", message: "Mobile No is required" },
      ]);
      errLength++;
    }

    if (employeeCode === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "employeeCode", message: "Employee Code is required" },
      ]);
      errLength++;
    }

    if (gender === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "gender", message: "Gender is required" },
      ]);
      errLength++;
    }

    if (department === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "department", message: "Department is required" },
      ]);
      errLength++;
    }

    if (officeBranch === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "officeBranch", message: "Office Branch is required" },
      ]);
      errLength++;
    }

    if (dob === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "dob", message: "Date of Birth is required" },
      ]);
      errLength++;
    }

    if (dob !== "" && dob !== null) {
      if (dob instanceof Date) {
        if (dob.getFullYear() < 1900) {
          setErrors((errors: Error[]) => [
            ...errors,
            { type: "dob", message: "Date of Birth is invalid" },
          ]);
          errLength++;
        }
      }
    }

    if (line1 === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "addressLine1", message: "Address Line 1 is required" },
      ]);
      errLength++;
    }

    if (line2 === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "addressLine2", message: "Address Line 2 is required" },
      ]);
      errLength++;
    }

    if (city === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "city", message: "City is required" },
      ]);
      errLength++;
    }

    if (state === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "state", message: "State is required" },
      ]);
      errLength++;
    }

    if (errLength === 0) return true;

    return false;
  };

  const validateChangePassword = () => {
    errLengthChangePassword = 0;
    setErrorsChangePassword([]);

    if (oldPassword === "") {
      setErrorsChangePassword((errorsChangePassword: Error[]) => [
        ...errorsChangePassword,
        { type: "oldPassword", message: "Old Password is required" },
      ]);
      errLengthChangePassword++;
    }

    if (confirmPassword === "") {
      setErrorsChangePassword((errorsChangePassword: Error[]) => [
        ...errorsChangePassword,
        { type: "confirmPassword", message: "Confirm Password is required" },
      ]);
      errLengthChangePassword++;
    }

    if (confirmPassword !== newPassword) {
      setErrorsChangePassword((errorsChangePassword: Error[]) => [
        ...errorsChangePassword,
        { type: "confirmPassword", message: "Password does not match" },
      ]);
      errLengthChangePassword++;
    }

    if (!match || !uppercase || !number || !special || !lowercase) {
      errLengthChangePassword++;
    }

    if (errLengthChangePassword === 0) return true;

    return false;
  };

  const validateNewPassword = (newPassword: string) => {
    if (newPassword.length > 8) {
      setMatch(true);
    }
    if (newPassword.length <= 8) {
      setMatch(false);
    }
    if (newPassword.match(/[A-Z]/)) {
      setUppercase(true);
    }
    if (!newPassword.match(/[A-Z]/)) {
      setUppercase(false);
    }
    if (newPassword.match(/[0-9]/)) {
      setNumber(true);
    }
    if (!newPassword.match(/[0-9]/)) {
      setNumber(false);
    }
    if (newPassword.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      setSpecial(true);
    }
    if (!newPassword.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      setSpecial(false);
    }
    if (newPassword.match(/[a-z]/)) {
      setLowercase(true);
    }
    if (!newPassword.match(/[a-z]/)) {
      setLowercase(false);
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
    setFirstName(employeeInfo?.data?.employee?.firstName);
    setLastName(employeeInfo?.data?.employee?.lastName);
    setEmailId(employeeInfo?.data?.employee?.email);
    setMobileNo(employeeInfo?.data?.employee?.contactNo);
    setEmployeeCode(employeeInfo?.data?.employee?.employeeId);
    setGender(employeeInfo?.data?.employee?.gender);
    setDepartment(employeeInfo?.data?.employee?.department);
    setOfficeBranch(employeeInfo?.data?.employee?.office_branch);
    setDob(employeeInfo?.data?.employee?.dob);
    setLine1(employeeInfo?.data?.employee?.addr_line1);
    setLine2(employeeInfo?.data?.employee?.addr_line2);
    setCity(employeeInfo?.data?.employee?.city);
    setState(employeeInfo?.data?.employee?.state);
  }, [employeeInfo.isSuccess]);

  useEffect(() => {
    setFirstName(adminInfo?.data?.employee?.firstName);
    setLastName(adminInfo?.data?.employee?.lastName);
    setEmailId(adminInfo?.data?.employee?.email);
    setMobileNo(adminInfo?.data?.employee?.contactNo);
    setEmployeeCode(adminInfo?.data?.employee?.employeeId);
    setGender(adminInfo?.data?.employee?.gender);
    setDepartment(adminInfo?.data?.employee?.department);
    setOfficeBranch(adminInfo?.data?.employee?.office_branch);
    setDob(adminInfo?.data?.employee?.dob);
    setLine1(adminInfo?.data?.employee?.addr_line1);
    setLine2(adminInfo?.data?.employee?.addr_line2);
    setCity(adminInfo?.data?.employee?.city);
    setState(adminInfo?.data?.employee?.state);
  }, [adminInfo.isSuccess]);

  // These lines should be on the landing page. Change it to /primary afterwards.

  useEffect(() => {
    validateNewPassword(newPassword);
  }, [newPassword]);

  // function handleChange(e: any) {
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const baseUrl = "https://sih-2022-server.azurewebsites.net/api";
  const handleChangePassword = async () => {
    const res = await fetch(
      `${baseUrl}/changePassword` +
        `?employeeId=${localStorage.getItem("empId")}` +
        `&oldPassword=${oldPassword}` +
        `&newPassword=${newPassword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );
    const data = await res.json();
    if (data.message === "Password changed successfully") {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorsChangePassword([]);
      errLengthChangePassword = 0;
      setPasswordChangeSuccess(true);
    } else {
      setErrorsChangePassword((errorsChangePassword: Error[]) => [
        ...errorsChangePassword,
        { type: "changePassword", message: data.message },
      ]);

      errLengthChangePassword++;
    }
  };

  const handleUpdateProfile = async () => {
    const res = await fetch(`${baseUrl}/updateProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({
        employeeId:
          employeeInfo.data?.employee?.employeeId ||
          adminInfo.data?.employee?.employeeId,
        firstName:
          firstName !==
          (params.user === "user"
            ? employeeInfo.data?.employee?.firstName
            : adminInfo.data?.employee?.firstName)
            ? firstName
            : null,
        lastName:
          lastName !==
          (params.user === "user"
            ? employeeInfo.data?.employee?.lastName
            : adminInfo.data?.employee?.lastName)
            ? lastName
            : null,
        gender:
          gender !==
          (params.user === "user"
            ? employeeInfo.data?.employee?.gender
            : adminInfo.data?.employee?.gender)
            ? gender
            : null,
        dob:
          dob !==
          (params.user === "user"
            ? employeeInfo.data?.employee?.dob
            : adminInfo.data?.employee?.dob)
            ? dob
            : null,
        contactNo:
          mobileNo !==
          (params.user === "user"
            ? employeeInfo.data?.employee?.contactNo
            : adminInfo.data?.employee?.contactNo)
            ? mobileNo
            : null,
        addr_line1:
          line1 !==
          (params.user === "user"
            ? employeeInfo.data?.employee?.addr_line1
            : adminInfo.data?.employee?.addr_line1)
            ? line1
            : null,
        addr_line2:
          line2 !==
          (params.user === "user"
            ? employeeInfo.data?.employee?.addr_line2
            : adminInfo.data?.employee?.addr_line2)
            ? line2
            : null,
        city:
          city !==
          (params.user === "user"
            ? employeeInfo.data?.employee?.city
            : adminInfo.data?.employee?.city)
            ? city
            : null,
        state:
          state !==
          (params.user === "user"
            ? employeeInfo.data?.employee?.state
            : adminInfo.data?.employee?.state)
            ? state
            : null,
        role:
          employeeInfo.data?.employee?.role || adminInfo.data?.employee?.role,
        picture: image === "" ? null : image,
      }),
    });
    const data = await res.json();
    if (data.message === "Profile updated successfully") {
      setProfileUpdateSuccess(true);
      errLength = 0;
      setErrors([]);
    } else {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "updateProfile", message: data.message },
      ]);
      errLength++;
    }
  };

  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result as string);
      setUpdated(true);
    };
    reader.readAsDataURL(file);
  };

  const uploadProfilePicture = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", file);

    const result = fetch(
      baseUrl +
        "/uploadProfilePicture" +
        "?filename=" +
        (params.user === "user"
          ? employeeInfo?.data?.employee?.employeeId
          : adminInfo?.data?.employee?.employeeId) +
        "." +
        file?.name?.split(".")[1],
      // +
      // "&id=" +
      // (params.user === "user"
      //   ? employeeInfo?.data?.employee?.employeeId
      //   : adminInfo?.data?.employee?.employeeId),
      {
        method: "POST",
        body: bodyFormData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "File uploaded successfully") {
          setUpdated(false);
          // setMessage(data.message);
          image = data.url;
          handleUpdateProfile();
          setImageLoading(false);
        } else {
          setImageLoading(false);
        }
      })
      .catch((err) => {
        setImageLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setPasswordChangeMessage("");
      setPasswordChangeSuccess(false);
    }, 3000);
  }, [passwordChangeSuccess === true]);

  return (
    <div className="h-screen flex bg-gray-350 overflow-hidden">
      <div className="w-1/4">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>
      {employeeInfo?.data || adminInfo?.data ? (
        <div className="w-full px-10 overflow-scroll">
          <h1 className="mt-12 mb-4 text-lg font-medium tracking-widest text-black">
            PROFILE
          </h1>

          <div className="flex flex-row gap-6">
            <img
              src={
                imagePreviewUrl ||
                employeeInfo?.data?.employee?.picture ||
                adminInfo?.data?.employee?.picture ||
                Dp
              }
              alt="profile_dp"
              className="w-48 h-48 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-end">
              {!updated ? (
                <button
                  className="bg-gradient-to-r from-blue-450 to-blue-150 text-white px-4 py-2 mb-3 w-full rounded-lg font-semibold"
                  onClick={() => hiddenFileInput.current?.click()}
                >
                  <input
                    // className="font-medium text-sm text-gray-150 hidden"
                    style={{ display: "none" }}
                    onChange={photoUpload}
                    ref={hiddenFileInput}
                    type="file"
                  ></input>
                  <label
                    htmlFor="file-upload"
                    className="flex cursor-pointer gap-1 justify-center"
                  >
                    <Upload />
                    Choose an image
                  </label>
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r flex gap-1 justify-center from-blue-450 to-blue-150 text-white px-4 py-2 mb-3 w-full rounded-lg font-semibold"
                  onClick={() => {
                    setImageLoading(true);
                    uploadProfilePicture();
                  }}
                >
                  <Face />
                  {imageLoading ? "Setting Up..." : "Set Profile Picture"}
                </button>
              )}
              <h1 className="mb-1 text-xs font-medium text-gray-650 tracking-widest">
                Acceptable format .jpg, .png only
              </h1>
              <h1 className="text-xs font-medium text-gray-650 tracking-widest">
                Max. file size is 500Kb and min. file size is 70Kb.
              </h1>
            </div>
          </div>

          <div className="mt-16">
            <h1 className="mt-12 mb-4 text-lg font-medium tracking-widest text-gray-750">
              ACCOUNT INFORMATION
            </h1>

            <div className="mt-6 grid grid-cols-2 gap-20">
              <div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    First Name
                  </h1>
                  <div className="bg-white w-full rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "firstName") {
                          return (
                            <p
                              className="text-red-500 text-xs text-right italic"
                              key={index}
                            >
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Email ID
                  </h1>

                  <div className="bg-white w-full rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full flex-auto"
                      placeholder="Enter Email ID"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "emailId") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Employee Code
                  </h1>

                  <div className="bg-white w-full  rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full flex-auto"
                      placeholder="Enter Employee Code"
                      disabled
                      value={employeeCode}
                      onChange={(e) => setEmployeeCode(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "employeeCode") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Department
                  </h1>

                  <div className="bg-white w-full  rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full flex-auto"
                      placeholder="Enter department"
                      disabled
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "department") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Date of Birth
                  </h1>

                  <div className="bg-white w-full rounded drop-shadow">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={dob}
                        onChange={(date) => setDob(date)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className="w-full"
                            size="small"
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "dob") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Last Name
                  </h1>

                  <div className="bg-white w-full  rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full flex-auto"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "lastName") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Mobile Number
                  </h1>

                  <div className="bg-white w-full  rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full flex-auto"
                      placeholder="Enter Mobile Number"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "mobileNo") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Gender
                  </h1>
                  <div className="bg-white w-full shadow-md rounded flex-auto">
                    <FormControl fullWidth>
                      <Select
                        id="gender"
                        value={gender || ""}
                        onChange={(e) => setGender(e.target.value)}
                        displayEmpty
                        size="small"
                        className="w-full"
                      >
                        <MenuItem value="">
                          <em>Select Gender</em>
                        </MenuItem>
                        {["Male", "Female", "Other"].map((item, index) => {
                          return (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "gender") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Office Branch
                  </h1>

                  <div className="bg-white w-full  rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full flex-auto"
                      placeholder="Enter office branch"
                      disabled
                      value={officeBranch}
                      onChange={(e) => setOfficeBranch(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "officeBranch") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h1 className="mt-12 mb-4 text-lg font-medium tracking-widest text-gray-750">
              ADDRESS
            </h1>
            <div className="flex flex-row gap-20">
              <div className="w-full">
                <div className="flex flex-row gap-4 w-full items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Line 1
                  </h1>
                  <div className="bg-white w-full rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full flex-auto"
                      placeholder="House/Flat No./Building Name"
                      value={line1}
                      onChange={(e) => setLine1(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "addressLine1") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row gap-4 w-full items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    Line 2
                  </h1>

                  <div className="bg-white w-full rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full flex-auto"
                      placeholder="Street/Area/Locality"
                      value={line2}
                      onChange={(e) => setLine2(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "addressLine2") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-20">
              <div className="w-full">
                <div className="flex flex-row gap-4 items-center mb-2 w-full">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    City
                  </h1>

                  <div className="bg-white w-full rounded drop-shadow">
                    <TextField
                      id="filled-search"
                      className="w-full flex-auto"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "city") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row gap-4 items-center mb-2 w-full">
                  <h1 className="font-normal text-base text-gray-650 w-40">
                    State / UT
                  </h1>
                  <div className="bg-white w-full shadow-md rounded flex-auto">
                    <FormControl fullWidth>
                      <Select
                        id="state"
                        value={state || ""}
                        onChange={(e) => setState(e.target.value)}
                        displayEmpty
                        size="small"
                        className="w-full"
                      >
                        <MenuItem value="">
                          <em>Select State / UT</em>
                        </MenuItem>
                        {[
                          "Andaman and Nicobar Islands",
                          "Andhra Pradesh",
                          "Arunachal Pradesh",
                          "Assam",
                          "Bihar",
                          "Chandigarh",
                          "Chhattisgarh",
                          "Dadra and Nagar Haveli",
                          "Daman and Diu",
                          "Delhi",
                          "Goa",
                          "Gujarat",
                          "Haryana",
                          "Himachal Pradesh",
                          "Jammu and Kashmir",
                          "Jharkhand",
                          "Karnataka",
                          "Kerala",
                          "Lakshadweep",
                          "Madhya Pradesh",
                          "Maharashtra",
                          "Manipur",
                          "Meghalaya",
                          "Mizoram",
                          "Nagaland",
                          "Odisha",
                          "Puducherry",
                          "Punjab",
                          "Rajasthan",
                          "Sikkim",
                          "Tamil Nadu",
                          "Telangana",
                          "Tripura",
                          "Uttar Pradesh",
                          "Uttarakhand",
                          "West Bengal",
                        ].map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errors.length > 0
                    ? errors.map((item, index) => {
                        if (item.type === "state") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-row gap-4 mx-auto w-80 pb-8">
            <div
              className="flex-auto"
              // Pass image link as empty in handleUpdateProfile
              onClick={() => validate() && handleUpdateProfile()}
            >
              <RegistrationButton text="Update Information" toUrl="/" />
            </div>
            <div className="flex-auto">
              <button
                className="bg-white text-blue-250 text-sm py-2 w-full rounded-lg font-medium border-2 border-blue-250"
                onClick={clearInputs}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="mt-12">
            <h1 className="mt-12 mb-4 text-lg font-medium tracking-widest text-gray-750">
              UPDATE PASSWORD
            </h1>

            <div className="mt-6 grid grid-cols-2 gap-20">
              <div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-36">
                    Old Password
                  </h1>

                  <div className="bg-white w-full rounded drop-shadow">
                    <FormControl variant="outlined" className="w-full">
                      <OutlinedInput
                        name="oldPassword"
                        type={showOldPassword ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        size="small"
                        className="w-full"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showOldPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errorsChangePassword.length > 0
                    ? errorsChangePassword.map((item, index) => {
                        if (item.type === "oldPassword") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="flex flex-row gap-4 items-center mb-2">
                  <h1 className="font-normal text-base text-gray-650 w-36">
                    Confirm Password
                  </h1>

                  <div className="bg-white w-full  rounded drop-shadow">
                    <FormControl variant="outlined" className="w-full">
                      <OutlinedInput
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        size="small"
                        className="w-full"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="mb-2 text-right">
                  {errorsChangePassword.length > 0
                    ? errorsChangePassword.map((item, index) => {
                        if (item.type === "confirmPassword") {
                          return (
                            <p className="text-red-500 text-xs" key={index}>
                              {item.message}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-6 items-center">
                  <h1 className="font-normal text-base text-gray-650 w-36">
                    New Password
                  </h1>

                  <div className="bg-white w-full  rounded drop-shadow">
                    <FormControl variant="outlined" className="w-full">
                      <OutlinedInput
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        size="small"
                        className="w-full"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showNewPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="w-1/2">
                    <p
                      className={`text-xs italic font-normal ${
                        uppercase ? "text-blue-150" : "text-gray-450"
                      }`}
                    >
                      <span className="text-sm">&#9679;</span> Contain at least
                      one uppercase
                    </p>

                    <p
                      className={`text-xs italic font-normal ${
                        number ? "text-blue-150" : "text-gray-450"
                      }`}
                    >
                      <span className="text-sm">&#9679;</span> Contain at least
                      one number
                    </p>

                    <p
                      className={`text-xs italic font-normal ${
                        special ? "text-blue-150" : "text-gray-450"
                      }`}
                    >
                      <span className="text-sm">&#9679;</span> Contain at least
                      one special character
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p
                      className={`text-xs italic font-normal ${
                        lowercase ? "text-blue-150" : "text-gray-450"
                      }`}
                    >
                      <span className="text-sm">&#9679;</span> Contain at least
                      one lowercase
                    </p>

                    <p
                      className={`text-xs italic font-normal ${
                        match ? "text-blue-150" : "text-gray-450"
                      }`}
                    >
                      <span className="text-sm">&#9679;</span> Password should
                      be greater than 8 characters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-12">
            {errorsChangePassword.length > 0
              ? errorsChangePassword.map((item, index) => {
                  if (item.type === "changePassword") {
                    return (
                      <p className="text-red-500 text-xs italic" key={index}>
                        {item.message}
                      </p>
                    );
                  }
                })
              : null}
          </div>

          <div className="flex justify-center mb-2">
            {passwordChangeMessage ? (
              <p className="text-green-500 text-xs italic">
                {passwordChangeMessage}
              </p>
            ) : null}
          </div>

          <div className="flex flex-row gap-8 mx-auto w-80 pb-16">
            <div
              className="flex-auto"
              onClick={() => {
                validateChangePassword() && handleChangePassword();
              }}
            >
              <RegistrationButton text="Change Password" toUrl="/" />
            </div>
            <div className="flex-auto">
              <button
                className="bg-white text-blue-250 text-sm py-2 w-full rounded-lg font-medium border-2 border-blue-250"
                onClick={clearInputs}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profile;
