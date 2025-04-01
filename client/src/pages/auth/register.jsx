import { useState } from "react";
import { Link } from "react-router-dom";
import { CommonForm } from "../../components/common/form";
import { registerFormControl } from "../../config/index";

const initialState = {
  userName: "",
  email: " ",
  password: "",
};

export const AuthRegister = () => {
  function onSubmit() {}
  const [formData, setFormData] = useState(initialState);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create an Account
        </h1>
        <p> Already have a account </p>
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to={"/auth/login"}
        >
          Login
        </Link>
      </div>
      <CommonForm
        formControls={registerFormControl}
        buttonText={"Sign up "}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};
