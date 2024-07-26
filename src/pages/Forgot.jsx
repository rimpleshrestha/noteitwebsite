import React from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";

function Forgot() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const forgotPassword = async (data) => {
    // Add your forgot password validation logic here
    console.log(data);
  };

  // Watch new password to validate confirm new password
  const newPassword = watch("newPassword", "");

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center max-sm:px-10">
      <h1 className="text-2xl font-semibold font-primary">Forgot password.</h1>
      <div className="w-1/3 max-xl:w-1/2 max-sm:w-full">
        <form onSubmit={handleSubmit(forgotPassword)}>
          <Input
            label="Old Password"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md"
            type="password"
            placeholder="Enter your old password"
            {...register("oldPassword", { required: true })}
          />
          {errors.oldPassword && (
            <span className="text-red-500">Old password is required</span>
          )}

          <Input
            label="New Password"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md"
            type="password"
            placeholder="Enter your new password"
            {...register("newPassword", { required: true })}
          />
          {errors.newPassword && (
            <span className="text-red-500">New password is required</span>
          )}

          <Input
            label="Confirm New Password"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md"
            type="password"
            placeholder="Confirm your new password"
            {...register("confirmNewPassword", {
              required: true,
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmNewPassword && (
            <span className="text-red-500">
              {errors.confirmNewPassword.message}
            </span>
          )}

          <Button className="text-white bg-primary mt-6 rounded-md">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
