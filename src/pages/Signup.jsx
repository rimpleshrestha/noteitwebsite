import React from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

import { Toaster, toast } from "react-hot-toast";
function Signup() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center max-sm:px-10 ">
      <h1 className="text-3xl font-semibold font-primary ">Join us !!</h1>
      <div className="w-1/3 max-xl:w-1/2 max-sm:w-full  ">
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
        <form /* onSubmit= your signup here */>
          <Input
            label="name"
            labelStyle=" capitalize font-semibold my-2 "
            className="rounded-md"
            placeholder="what is your name"
            {...register("name", { required: true })}
          />
          <Input
            label="email"
            type="email"
            labelStyle=" capitalize font-semibold my-2  "
            className="rounded-md lowercase"
            placeholder="what is your email"
            {...register("email", { required: true })}
          />
          <Input
            label="password"
            type="password"
            labelStyle=" capitalize font-semibold my-2"
            className="rounded-md"
            placeholder="what is your password"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className="bg-primary  text-white mt-6  rounded-md"
          >
            Sign up
          </Button>
        </form>
        <p className="font-primary">
          Already have an account?
          <Link
            to="/login"
            className=" font-primary font-semibold my-3 inline-block"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
