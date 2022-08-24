import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBg from "../../components/SideBg";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import SignInButton from "../../components/buttons/SignInButton";
import DiveIn from "../../components/buttons/RegistrationButton";
import { useMutateLogin } from "../../queries/mutations";

export default function SignIn() {
  const [password, setPassword] = useState<string>("");
  const [empId, setEmpId] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);
  var errLength = 0;
  const navigate = useNavigate();

  const { mutateAsync: loginData } = useMutateLogin({
    onSuccess: (data: any) => {
      if (data.message === "Login successful") {
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("empId", empId);
        localStorage.setItem("adminId", empId);
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        navigate(
          "/" + (empId.slice(0, 1) === "E" ? "user" : "admin") + "/primary"
        );
      } else {
        setErrors((errors: Error[]) => [
          ...errors,
          { type: "unknown", message: data.message },
        ]);
      }
      setLoading(false);
    },
    onError: () => {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "unknown", message: "Login failed" },
      ]);
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
  }) as unknown as { mutateAsync: (data: any) => Promise<any> };

  interface Error {
    type: string;
    message: string;
  }

  const validate = () => {
    errLength = 0;
    setErrors([]);

    if (empId === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "employeeId", message: "Employee ID is required" },
      ]);
      errLength++;
    }

    if (password === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "password", message: "Password is required" },
      ]);
      errLength++;
    }

    if (errLength == 0) return true;

    return false;
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      validate() &&
        loginData({
          employeeId: empId,
          password: password,
          role: empId.substring(0, 1) === "E" ? "employee" : "admin",
        });
    }
  };

  return (
    <div className="flex gap-32 items-center h-screen px-32 bg-gray-250">
      <div className="w-2/5">
        <SideBg />
      </div>
      <div className="w-3/5 bg-white shadow-xl py-16 px-24 rounded-2xl">
        <SignInButton />
        <div className="flex pt-8 gap-4">
          <TextField
            label="ID"
            id="employee-id"
            fullWidth
            size="small"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-1 mb-1 text-left">
            {errors.length > 0
              ? errors.map((item, index) => {
                  if (item.type === "employeeId") {
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

        <div className="pt-4">
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(event) => onEnterPress(event)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className="mt-1 mb-1 text-left">
            {errors.length > 0
              ? errors.map((item, index) => {
                  if (item.type === "password") {
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
        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-row items-center">
            <Checkbox
              size="small"
              value={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <p className="text-gray-450 text-xs">Remember Me</p>
          </div>
          <Link
            to="/forgot-password"
            className="text-gray-450 text-xs pr-2 h-4"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="flex justify-center mb-1">
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
        <div
          onClick={(e: React.MouseEvent<HTMLButtonElement> | any) => {
            e.preventDefault();
            validate() &&
              loginData({
                employeeId: empId,
                password: password,
                role: empId.substring(0, 1) === "E" ? "employee" : "admin",
              });
          }}
        >
          <DiveIn text={loading ? "Diving In..." : "Dive In !!!"} toUrl="/" />
        </div>
      </div>
    </div>
  );
}
