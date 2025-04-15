import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CommonForm } from "../../components/common/form";
import { loginFormControl } from "../../config/index";
import { loginUser } from "../../store/auth-slice/index";

const initialState = {
  email: " ",
  password: "",
};

export const AuthLogin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast(data.payload.message, {
          icon: "🔥",
          style: {
            background: "white",
            color: "#000",
            border: "1px solid #000",
            borderRadius: "10px",
            padding: "10px",
          },
        });
      } else {
        toast(data.payload.message, {
          icon: "😫",
          style: {
            background: "red",
            color: "#fff",
            border: "1px solid #fff",
            borderRadius: "10px",
            padding: "10px",
          },
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to Your Account
        </h1>
        <p> Don't Have Any Account </p>
        <Link
          className="font-medium ml-2 text-primary hover:underline "
          to={"/auth/register"}
        >
          Register
        </Link>
      </div>
      <CommonForm
        formControls={loginFormControl}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};
