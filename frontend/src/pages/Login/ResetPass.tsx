import { Input, Title } from "../../components";
import useAuth from "../../hooks/useAuth";
import "./loginPage.scss";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import loginImg from "../../assets/images/login.jpg";

export type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function LoginPage() {
  const { resetP } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const { token } = useParams();
  const submit = async ({ password }: FormValues) => {
    token && (await resetP(token, password));
    navigate("/login");
  };

  return (
    <div className="loginCont">
      <div className="f1">
        <div className="f2">
          <div className="formHeader">
            <Title title="Reset Password" fontSize="32px" fontWeight={700} />
          </div>
          <form onSubmit={handleSubmit(submit)} noValidate name="login">
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
            <input type="submit" value={"Change Password"} />
          </form>
          {/* <div className="btnCont">
            New user? &nbsp;
            <Link to={`/register${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
              Register Here
            </Link>
          </div> */}
        </div>
      </div>
      <div className="imgCont">
        <img src={ loginImg } alt={"login picture"} loading="lazy" />
      </div>
    </div>
  );
}
