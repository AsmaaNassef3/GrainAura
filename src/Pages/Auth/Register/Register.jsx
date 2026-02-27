import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/Scema/authScema.js";
import { motion as Motion } from "framer-motion";
import { fadeUp, stagger } from "@/animations";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/authServices";

function Register() {
  const [showPasswords, setShowPasswords] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");

const navigate = useNavigate()
  const { register, handleSubmit,  formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "",
      dateOfBirth: "",
    },
  });

 async function onSubmit(RegistrationData) {
  setErrorMessage("");
  setSuccessMessage("");

  try {
    const response = await registerUser(RegistrationData);

    if (response.data.message === "success") {
      setSuccessMessage("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  } catch (error) {
    const backendMessage =
      error.response?.data?.message || "Something went wrong";

    setErrorMessage(backendMessage);
  }
}


  return (
    <div className="flex-1 flex items-center justify-center px-2 py-12">
      <Motion.div variants={fadeUp} initial="hidden" animate="visible">
        <Card className="w-full max-w-lg rounded-2xl shadow-xl">
          <CardBody className="p-8 space-y-6">

            {/* Header */}
            <Motion.div variants={fadeUp} className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Create your Aura account
              </h2>
              <p className="text-sm text-slate-500">
                Let’s begin something meaningful
              </p>
            </Motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">

                {/* Full Name */}
                <Motion.div variants={fadeUp}>
                  <Input
                    {...register("name")}
                    label="Full Name"
                    variant="bordered"
                    errorMessage={errors.name?.message}
                    isInvalid={Boolean(errors.name)}
                    radius="lg"
                    startContent={<HiOutlineUser className="text-slate-400" />}
                  />
                </Motion.div>

                {/* Email */}
                <Motion.div variants={fadeUp}>
                  <Input
                    {...register("email")}
                    label="Email Address"
                    type="email"
                    variant="bordered"
                    errorMessage={errors.email?.message}
                    isInvalid={Boolean(errors.email)}
                    radius="lg"
                    startContent={<HiOutlineMail className="text-slate-400" />}
                  />
                </Motion.div>

                {/* Password */}
                <Motion.div variants={fadeUp}>
                  <Input
                    {...register("password")}
                    label="Password"
                    errorMessage={errors.password?.message}
                    isInvalid={Boolean(errors.password)}
                    type={showPasswords ? "text" : "password"}
                    variant="bordered"
                    radius="lg"
                    startContent={<HiOutlineLockClosed className="text-slate-400" />}
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPasswords(!showPasswords)}
                        className="focus:outline-none"
                      >
                        {showPasswords ? (
                          <HiOutlineEyeOff className="text-slate-400" size={20} />
                        ) : (
                          <HiOutlineEye className="text-slate-400" size={20} />
                        )}
                      </button>
                    }
                  />
                </Motion.div>

                {/* Repeat Password */}
                <Motion.div variants={fadeUp}>
                  <Input
                    {...register("rePassword")}
                    label="RePassword"
                    errorMessage={errors.rePassword?.message}
                    isInvalid={Boolean(errors.rePassword)}
                    type={showPasswords ? "text" : "password"}
                    variant="bordered"
                    radius="lg"
                    startContent={<HiOutlineLockClosed className="text-slate-400" />}
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPasswords(!showPasswords)}
                        className="focus:outline-none"
                      >
                        {showPasswords ? (
                          <HiOutlineEyeOff className="text-slate-400" size={20} />
                        ) : (
                          <HiOutlineEye className="text-slate-400" size={20} />
                        )}
                      </button>
                    }
                  />
                </Motion.div>

                {/* Gender */}
       <Motion.div variants={fadeUp}>
  <div className="flex flex-col">
    <label className="text-sm font-medium text-slate-700 mb-1">
      Gender
    </label>
    <select
      {...register("gender")}
      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
        errors.gender ? "border-red-500" : ""
      }`}
    >
      <option value="">Select gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    {errors.gender && (
      <p className="text-red-500 text-sm mt-1">
        {errors.gender.message}
      </p>
    )}
  </div>
</Motion.div>




                {/* Date of Birth */}
                <Motion.div variants={fadeUp}>
                  <Input
                    {...register("dateOfBirth")}
                    type="date"
                    label="Date of Birth"
                    variant="bordered"
                    radius="lg"
                    isInvalid={Boolean(errors.dateOfBirth)}
                    errorMessage={errors.dateOfBirth?.message}
                    startContent={<HiOutlineCalendar className="text-slate-400" />}
                  />
                </Motion.div>

                {/* Submit Button */}
                <Motion.div variants={fadeUp}>
                  <Button
                    className="w-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                    size="lg"
                    type="submit"
                    radius="lg"
                  >
                    Get Started
                  </Button>
                </Motion.div>

              </Motion.div>
            </form>
            {/* Success Message */}
{successMessage && (
  <p className="text-green-600 text-sm text-center font-medium">
    {successMessage}
  </p>
)}

{/* Error Message */}
{errorMessage && (
  <p className="text-red-500 text-sm text-center font-medium">
    {errorMessage}
  </p>
)}

          </CardBody>
        </Card>
      </Motion.div>
    </div>
  );
}

export default Register;
