import React from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8070/api/user/register",
        {
          fullName: data.name,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      toast.success("Registration successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      const errorMessage =
        error.response?.status === 409
          ? "Email already exists. Please try another one."
          : error.response?.data?.message ||
            "Registration failed. Please try again.";
      console.error("Registration error:", errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center max-sm:px-10">
      <h1 className="text-3xl font-semibold font-primary">Join us !!</h1>
      <div className="w-1/3 max-xl:w-1/2 max-sm:w-full">
        <Toaster
          position="top-center"
          gutter={8}
          toastOptions={{
            className: "mt-20",
            style: {
              background: "white",
              color: "black",
            },
          }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="name"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md"
            placeholder="What is your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}

          <Input
            label="email"
            type="email"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md lowercase"
            placeholder="What is your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}

          <Input
            label="password"
            type="password"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md"
            placeholder="What is your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}

          <Button
            type="submit"
            className="bg-primary text-white mt-6 rounded-md"
          >
            Sign up
          </Button>
        </form>
        <div className="mt-3">
          <p className="font-primary inline-block mr-2">
            Already have an account?{" "}
          </p>
          <Link
            to="/login"
            className="font-primary font-semibold my-3 inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
