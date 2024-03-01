import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Input, Title } from "../../components";
import { FormDetails } from "../../types/logTypes";
import "./profilePage.scss";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDetails>();
  const { user, updateProfile } = useAuth();

  const submit = (user: FormDetails) => {
    updateProfile(user);
  };

  return (
    <div className="profileCont">
      <div className="box">
        <div className="editbox">
          <Title title={"Edit Details"} />
          <form onSubmit={handleSubmit(submit)}>
            <Input
              defaultValue={user?.name}
              type="text"
              label="Name"
              {...register("name", {
                required: true,
                minLength: 5,
              })}
              error={errors.name}
            />
            <Input
              defaultValue={user?.phone}
              type="tel"
              label="Mobile number"
              {...register("mobileNumber", {
                required: true,
                minLength: 6,
              })}
              error={errors.mobileNumber}
            />
            <Input
              defaultValue={user?.email}
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
              defaultValue={user?.address}
              type="text"
              label="Address"
              {...register("address", {
                required: true,
                minLength: 10,
              })}
              error={errors.address}
            />
            <button type="submit">Update</button>
          </form>
        </div>
        <ChangePassword />
      </div>
    </div>
  );
}
