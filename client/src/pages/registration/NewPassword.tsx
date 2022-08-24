import React, { useEffect, useState } from "react";
import SignInButton from "../../components/buttons/SignInButton";
import SideBg from "../../components/SideBg";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RegistrationBackButton from "../../components/buttons/RegistrationBackButton";
import RegistrationButton from "../../components/buttons/RegistrationButton";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [match, setMatch] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  var errLength = 0;

  interface Error {
    type: string;
    message: string;
  }

  const navigate = useNavigate();

  const validateNewPassword = (password: string) => {
    if (password.length > 8) {
      setMatch(true);
    }
    if (password.length <= 8) {
      setMatch(false);
    }
    if (password.match(/[A-Z]/)) {
      setUppercase(true);
    }
    if (!password.match(/[A-Z]/)) {
      setUppercase(false);
    }
    if (password.match(/[0-9]/)) {
      setNumber(true);
    }
    if (!password.match(/[0-9]/)) {
      setNumber(false);
    }
    if (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      setSpecial(true);
    }
    if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      setSpecial(false);
    }
    if (password.match(/[a-z]/)) {
      setLowercase(true);
    }
    if (!password.match(/[a-z]/)) {
      setLowercase(false);
    }
  };

  const validate = () => {
    setErrors([]);
    errLength = 0;

    if (confirmPassword !== newPassword) {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "confirmPassword", message: "Passwords do not match" },
      ]);
      errLength++;
    }

    if (!match || !uppercase || !number || !special || !lowercase) {
      errLength++;
    }

    if (errLength == 0) return true;

    return false;
  };

  const baseUrl = "https://sih-2022-server.azurewebsites.net/api";
  const handleNewPassword = async () => {
    const res = await fetch(
      `${baseUrl}/forgotPassword` +
        `?token=${window.location.href.split("=")[1]}` +
        `&newPassword=${newPassword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.message === "Password changed successfully!") {
      setSuccessMessage(data.message);
      navigate("/sign-in");
    } else {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "unknown", message: data.message },
      ]);
    }
  };

  useEffect(() => {
    validateNewPassword(newPassword);
  }, [newPassword]);

  return (
    <div className="flex gap-32 items-center h-screen px-32 bg-gray-250">
      <div className="w-2/5">
        <SideBg />
      </div>
      <div className="w-3/5 bg-white shadow-xl py-16 px-24 rounded-2xl">
        <SignInButton />

        <p className="mt-8 mb-4 h-5 text-gray-750 font-medium">
          Set New Password
        </p>
        <div className="mt-4">
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
        </div>

        <p
          className={`text-xs italic font-normal ${
            uppercase ? "text-blue-150" : "text-gray-450"
          }`}
        >
          <span className="text-sm">&#9679;</span> Contain at least one
          uppercase
        </p>

        <p
          className={`text-xs italic font-normal ${
            number ? "text-blue-150" : "text-gray-450"
          }`}
        >
          <span className="text-sm">&#9679;</span> Contain at least one number
        </p>

        <p
          className={`text-xs italic font-normal ${
            special ? "text-blue-150" : "text-gray-450"
          }`}
        >
          <span className="text-sm">&#9679;</span> Contain at least one special
          character
        </p>

        <p
          className={`text-xs italic font-normal ${
            lowercase ? "text-blue-150" : "text-gray-450"
          }`}
        >
          <span className="text-sm">&#9679;</span> Contain at least one
          lowercase
        </p>

        <p
          className={`text-xs italic font-normal ${
            match ? "text-blue-150" : "text-gray-450"
          }`}
        >
          <span className="text-sm">&#9679;</span> Password should be greater
          than 8 characters
        </p>

        <div className="mt-4">
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
        </div>

        <div className="mt-1 mb-1 text-left">
          {errors.length > 0
            ? errors.map((item, index) => {
                if (item.type === "confirmPassword") {
                  return (
                    <p className="text-red-500 text-xs italic" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
            : null}
        </div>

        <RegistrationBackButton toUrl="/forgot-password" />
        <div className="mt-1 mb-1 text-center">
          {errors.length > 0
            ? errors.map((item, index) => {
                if (item.type === "unknown") {
                  return (
                    <p className="text-red-500 text-xs italic" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
            : null}
        </div>
        {/* Success Message */}
        {successMessage ? (
          <p className="text-green-500 text-xs italic text-center mt-1 mb-1">
            {successMessage}
          </p>
        ) : null}
        <div onClick={() => validate() && handleNewPassword()}>
          <RegistrationButton toUrl="/sign-in" text="Reset" />
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
