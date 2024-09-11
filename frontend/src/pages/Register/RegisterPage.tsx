import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./register.scss";
import { Input, Title } from "../../components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RegisterValues } from "../../types/logTypes";
import useAuth from "../../hooks/useAuth";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterValues>();
  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [navigate, returnUrl, user]);

  const submit = async (data: RegisterValues) => {
    auth.register(data);
  };

  return (
    <div className="loginCont">
      <div className="f1">
        <div className="f2">
          <Title title="Register" fontSize="32px" fontWeight={700} />
          <form onSubmit={handleSubmit(submit)}>
            <div className="name">
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
            </div>
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
          <div className="btnCont">
            Already a user? &nbsp;
            <Link to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
              Login here
            </Link>
          </div>
        </div>
      </div>
      <div className="imgCont">
        <img src="/login.jpg" alt={"login picture"} />
      </div>
    </div>
  );
}
