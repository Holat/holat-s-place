import { useForm } from "react-hook-form";
import "./register.scss";
import { Input, Title } from "../../components";
import { Link, useSearchParams } from "react-router-dom";
import { RegisterValues } from "../../types/logTypes";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterValues>();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  const submit = async (data: RegisterValues) => {
    console.log("");
  };

  return (
    <div className="loginCont">
      <div className="formCont">
        <Title title="Register" fontSize="32px" fontWeight={700} />
        <form onSubmit={handleSubmit(submit)}>
          <Input
            type="text"
            label="First name"
            {...register("firstName", { required: true, maxLength: 80 })}
            error={errors.firstName}
          />
          <Input
            type="text"
            label="Last name"
            {...register("lastName", { required: true, maxLength: 100 })}
            error={errors.lastName}
          />
          <Input
            type="text"
            label="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Email Is Not Valid",
              },
            })}
            error={errors.email}
          />
          <Input
            type="tel"
            label="Mobile number"
            {...register("mobileNumber", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
            error={errors.mobileNumber}
          />
          <Input
            type="address"
            label="Address"
            {...register("address", {
              required: true,
              minLength: 10,
            })}
            error={errors.mobileNumber}
          />
          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true,
            })}
            error={errors.password}
          />
          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value !== getValues("password")
                  ? "Passwords Do Not Match"
                  : true,
            })}
            error={errors.confirmPassword}
          />
          <input type="submit" value={"Register"} />
        </form>
      </div>
      <div className={"register"}>
        Already a user? &nbsp;
        <Link to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
          Login here
        </Link>
      </div>
    </div>
  );
}
