import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CommonForm } from "../../components/common/form";
import { registerFormControl } from "../../config/index";
import { registerUser } from "../../store/auth-slice/index";

const initialState = {
  userName: "",
  email: " ",
  password: "",
};

export const AuthRegister = () => {
  // const user = useSelector((state) => state.auth.user);
  // console.log(user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      // navigate("/auth/login");
      if (data?.payload?.success) {
        toast(data.payload.message, {
          icon: "🔥",
          style: {
            background: "#1e1",
            color: "#fff",
            border: "1px solid #ff9800",
            borderRadius: "10px",
            padding: "10px",
          },
        });
        navigate("/auth/login");
      } else {
        toast(data.payload.message, {
          icon: "😫",
          style: {
            background: "red",
            color: "#fff",
            border: "1px solid #ff9800",
            borderRadius: "10px",
            padding: "10px",
          },
        });
      }
    });
  }
  // console.log(formData);
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
