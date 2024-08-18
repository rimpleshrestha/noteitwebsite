import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../tools/authSlice";

// Set up axios interceptors
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId"); // Remove user ID from local storage
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");

  const loginSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8070/api/user/login",
        data
      );

      if (response.data.success) {
        setLoginError("");
        /* just like how you have added the token and user id in this code  */
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId); // Save the user ID to local storage
        dispatch(login(response.data));
        navigate("/all-notes");
      } else {
        // Check if the error message is related to incorrect password
        setLoginError(response.data.message || "Login failed");
      }
    } catch (error) {
      setLoginError(
        error.response?.data?.message || "An error occurred during login"
      );
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center max-sm:px-10 bg-main">
      <h1 className="text-3xl font-semibold font-primary">Welcome back !!</h1>
      <div className="w-1/3 max-xl:w-1/2 max-sm:w-full">
        {loginError && (
          <p className="text-red-500 text-xs italic">{loginError}</p>
        )}
        <form onSubmit={handleSubmit(loginSubmit)}>
          <Input
            label="email"
            labelStyle="capitalize font-semibold my-2"
            className="rounded-md lowercase"
            placeholder="What is your email"
            autoComplete="off"
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
            Log in
          </Button>
        </form>
        <Link
          to="/forgot"
          className="font-primary inline-block my-3 font-medium"
        >
          Change your password?
        </Link>
      </div>
    </div>
  );
}

export default Login;
