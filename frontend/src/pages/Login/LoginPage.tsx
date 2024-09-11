import { useEffect } from "react";
import { Input, Title } from "../../components";
import useAuth from "../../hooks/useAuth";
import "./loginPage.scss";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

export type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { user, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [navigate, returnUrl, user]);

  const submit = async ({ email, password }: FormValues) => {
    login(email, password);
  };

  return (
    <div className="loginCont">
      <div className="f1">
        <div className="f2">
          <div className="formHeader">
            <Title title="Sign in" fontSize="32px" fontWeight={700} />
          </div>
          <form onSubmit={handleSubmit(submit)} noValidate name="login">
            <Input
              type="text"
              label="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                  message: "Email Is Not valid",
                },
              })}
              error={errors.email}
            />
            <Input
              type="password"
              label="Password"
              {...register("password", {
                required: true,
              })}
              error={errors.password}
            />
            <input type="submit" value={"Login"} />
          </form>
          <div className="btnCont">
            New user? &nbsp;
            <Link to={`/register${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
              Register Here
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
