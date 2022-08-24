import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import TextField from "@mui/material/TextField";
import RegistrationButton from "../../components/buttons/RegistrationButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Select from "@mui/material/Select";
import { useMutateCreateEmployee } from "../../queries/mutations";

interface Props {
  selected: number;
  setSelected: (selected: number) => void;
}

interface Error {
  type: string;
  message: string;
}

const CreateNewEmployee = ({ selected, setSelected }: Props) => {
  useEffect(() => {
    setSelected(10);
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
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Error[]>([]);

  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setEmailId("");
    // setEmployeeCode("");
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

  const { mutateAsync: createEmployeeData } = useMutateCreateEmployee({
    onSuccess: (data: any) => {
      if (data.message === "Employee created successfully") {
        setMessage(data.message);
        clearInputs();
        setMessage("Employee created successfully");
        setLoading(false);
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
      setMessage("");
    }, 5000);
  }, [message]);

  var errLength = 0;
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

    // if (employeeCode === "") {
    //   setErrors((errors: Error[]) => [
    //     ...errors,
    //     { type: "employeeCode", message: "Employee Code is required" },
    //   ]);
    //   errLength++;
    // }

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

  return (
    <div className="h-screen flex bg-gray-350 overflow-hidden">
      <div className="w-1/4">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>
      <div className="w-full px-10 overflow-scroll">
        <h1 className="mt-12 mb-4 text-lg font-medium tracking-widest">
          CREATE NEW EMPLOYEE
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
            {/* <div className="flex flex-row gap-4 items-center mb-2">
              <h1 className="font-normal text-base text-gray-650 w-40">
                Employee Code
              </h1>

              <div className="bg-white w-full  rounded drop-shadow">
                <TextField
                  id="filled-search"
                  className="w-full flex-auto"
                  placeholder="Enter Employee Code"
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
            </div> */}
            <div className="flex flex-row gap-4 items-center mb-2">
              <h1 className="font-normal text-base text-gray-650 w-40">
                Department
              </h1>

              <div className="bg-white w-full  rounded drop-shadow">
                <TextField
                  id="filled-search"
                  className="w-full flex-auto"
                  placeholder="Enter department"
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
                      <TextField {...params} className="w-full" size="small" />
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
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    displayEmpty
                    size="small"
                    className="w-full"
                  >
                    <MenuItem value="">
                      <em>Select Gender</em>
                    </MenuItem>
                    {["Male", "Female", "Other"].map((item, index) => {
                      return <MenuItem value={item}>{item}</MenuItem>;
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
                      value={state}
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

        <div className="text-center pt-12">
          {errors.length > 0
            ? errors.map((item, index) => {
                if (item.type === "unknown") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
            : null}
        </div>
        <div className="pt-4 flex flex-row gap-8 mx-auto w-80 pb-16">
          <div
            className="flex-auto"
            onClick={(e: React.MouseEvent<HTMLButtonElement> | any) => {
              e.preventDefault();
              validate() &&
                createEmployeeData({
                  firstName: firstName,
                  lastName: lastName,
                  personalEmail: emailId,
                  contactNo: mobileNo,
                  gender: gender,
                  dob: dob,
                  addr_line1: line1,
                  addr_line2: line2,
                  city: city,
                  state: state,
                  office_branch: officeBranch,
                  role: null,
                  department: department,
                });
            }}
          >
            <RegistrationButton
              text={loading ? "Creating..." : "Create"}
              toUrl=""
            />
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
    </div>
  );
};

export default CreateNewEmployee;
