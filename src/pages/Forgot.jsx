import React from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // Initialize useNavigate

  const forgotPassword = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:8070/api/user/update-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          }),
        }
      );

      if (response.ok) {
        alert("Password updated successfully");
        navigate("/login"); // Navigate to the login page
      } else {
        const errorText = await response.text();
        alert(`Failed to update password: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the password");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center max-sm:px-10">
      <h1 className="text-2xl font-semibold font-primary">Forgot Password</h1>
      <div className="w-1/3 max-xl:w-1/2 max-sm:w-full">
        <form onSubmit={handleSubmit(forgotPassword)}>
          <Input
            label="Email"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md"
            type="email"
            placeholder="Enter your email address"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <Input
            label="Old Password"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md"
            type="password"
            placeholder="Enter your old password"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
          />
          {errors.oldPassword && (
            <span className="text-red-500">{errors.oldPassword.message}</span>
          )}

          <Input
            label="New Password"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md"
            type="password"
            placeholder="Enter your new password"
            {...register("newPassword", {
              required: "New password is required",
            })}
          />
          {errors.newPassword && (
            <span className="text-red-500">{errors.newPassword.message}</span>
          )}

          {/* Uncomment if you want to include a confirm password field
          <Input
            label="Confirm New Password"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md"
            type="password"
            placeholder="Confirm your new password"
            {...register("confirmPassword", { required: "Confirmation of new password is required" })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}
          */}

          <Button className="text-white bg-primary mt-6 rounded-md">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
