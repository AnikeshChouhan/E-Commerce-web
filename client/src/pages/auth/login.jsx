import { useState } from "react";
import { Link } from "react-router-dom";
import { CommonForm } from "../../components/common/form";
import { loginFormControl } from "../../config/index";

const initialState = {
  email: " ",
  password: "",
};

export const AuthLogin = () => {
  function onSubmit() {}
  const [formData, setFormData] = useState(initialState);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to Your Account
        </h1>
        <p> Don't Have Any Account </p>
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to={"/auth/register"}
        >
          Register
        </Link>
      </div>
      <CommonForm
        formControls={loginFormControl}
        buttonText={"Sign up "}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};
