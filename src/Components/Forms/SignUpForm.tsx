import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./Form.css";
import { post } from "../../Api/axios";

type SignUpFormProps = {
  formCallback?: (data: SignUpFormDataType) => void;
};

type SignUpFormDataType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpFormDataDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const REGISTER_URL = "/api/v1/auth/register";

const SignUpForm = ({ formCallback }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as SignUpFormDataType,
  });
  const password = useRef({});
  password.current = watch("password", "");
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const {
      email,
      name,
      surname,
      password,
      confirmPassword,
    }: SignUpFormDataType = data;

    const dataToSend: SignUpFormDataDto = {
      //TODO: Fit it to server needs
      firstName: name,
      lastName: surname,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      await post(REGISTER_URL, dataToSend, true).then((responseData) => {
        if (responseData) {
          reset();
          navigate("/signin");
        }
      });
    } catch (error: unknown) {
      console.log("error", error);
      alert("Email already taken!")
    }
  };

  return (
    <div className="FormContainer">
      <div className="FormTitle"></div>
      <form className="Form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="FormInput"
          {...register("name", {
            required: "Please enter your first name.",
            validate: {
              minLength: (v) =>
                v.length >= 3 || "Name must have at least 3 letters",
              matchPattern: (v) =>
                /^[a-zA-Z]+$/.test(v) || "Name must contain only letters",
            },
          })}
          placeholder="Name"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="name" />
        </small>
        <input
          className="FormInput"
          {...register("surname", {
            required: "Please enter your last name.",
            validate: {
              minLength: (v) =>
                v.length >= 3 || "Surname must have at least 3 letters",
              matchPattern: (v) =>
                /^[a-zA-Z]+$/.test(v) || "Name must contain only letters",
            },
          })}
          placeholder="Surname"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="surname" />
        </small>
        <input
          className="FormInput"
          {...register("email", {
            required: "Please enter your email.",
            validate: {
              maxLength: (v) =>
                v.length <= 50 || "The email should have at most 50 characters",
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "Email address must be a valid address",
            },
          })}
          placeholder="Email"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="email" />
        </small>
        <input
          className="FormInput"
          type="password"
          {...register("password", {
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          placeholder="Password"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="password" />
        </small>
        <input
          className="FormInput"
          type="password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
          placeholder="Confirm password"
        />
        <small className="FormErrorMessage">
          <ErrorMessage errors={errors} name="confirmPassword" />
        </small>
        <input className="FormSubmitButton" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default SignUpForm;
