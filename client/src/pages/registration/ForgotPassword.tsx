import { useState } from "react";
import SignInButton from "../../components/buttons/SignInButton";
import SideBg from "../../components/SideBg";
import TextField from "@mui/material/TextField";
import RegistrationButton from "../../components/buttons/RegistrationButton";
import RegistrationBackButton from "../../components/buttons/RegistrationBackButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  interface Error {
    type: string;
    message: string;
  }

  var errLength = 0;

  const validate = () => {
    errLength = 0;
    setErrors([]);

    if (email === "") {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "email", message: "Email is required" },
      ]);
      errLength++;
    }
    if (
      email.length > 0 &&
      email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null
    ) {
      setErrors((errors: Error[]) => [
        ...errors,
        {
          type: "email",
          message: "Must be a valid email",
        },
      ]);
      errLength++;
    }

    if (errLength == 0) return true;

    return false;
  };

  const baseUrl = "https://sih-2022-server.azurewebsites.net/api";
  const handleRequestChangePassword = async () => {
    const res = await fetch(
      `${baseUrl}/requestForgotPassword` + `?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.message === "Reset password email sent successfully!") {
      setSuccessMessage(data.message);
    } else {
      setErrors((errors: Error[]) => [
        ...errors,
        { type: "unknown", message: data.message },
      ]);
    }
  };

  return (
    <div className="flex gap-32 items-center h-screen px-32 bg-gray-250">
      <div className="w-2/5">
        <SideBg />
      </div>
      <div className="w-3/5 bg-white shadow-xl py-16 px-24 rounded-2xl">
        <SignInButton />
        <p className="mt-8 mb-4 h-5 text-gray-750 font-medium">Forgot Email</p>
        <TextField
          type="email"
          label="Email"
          id="email"
          fullWidth
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-1 mb-1 text-left">
          {errors.length > 0
            ? errors.map((item, index) => {
                if (item.type === "email") {
                  return (
                    <p className="text-red-500 text-xs" key={index}>
                      {item.message}
                    </p>
                  );
                }
              })
            : null}
        </div>

        <RegistrationBackButton toUrl="/sign-in" />
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
        <div onClick={() => validate() && handleRequestChangePassword()}>
          <RegistrationButton toUrl="/new-password" text="Reset Password" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
