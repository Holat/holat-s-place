import useAuth from "../../hooks/useAuth";
import Input from "../Input/Input";
import Title from "../Title/Title";
import { ChangePassFormType } from "../../types/logTypes";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const { changePassword } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangePassFormType>();

  const submit = (passwords: ChangePassFormType) => {
    changePassword(passwords);
  };

  return (
    <div className="editbox">
      <Title title={"Change Password"} />
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="password"
          label="Current Password"
          {...register("currentPassword", {
            required: true,
          })}
          error={errors.currentPassword}
        />
        <Input
          type="password"
          label="New Password"
          {...register("newPassword", {
            required: true,
            minLength: 5,
          })}
          error={errors.newPassword}
        />
        <Input
          type="password"
          label="Confirm New Password"
          {...register("confirmNewPassword", {
            required: true,
            validate: (value) =>
              value !== getValues("newPassword")
                ? "Passwords Do not Match"
                : true,
          })}
          error={errors.confirmNewPassword}
        />
        <button type="submit">Change</button>
      </form>
    </div>
  );
}
