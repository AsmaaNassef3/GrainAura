import { Card, CardBody, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/Scema/authScema.js";
import { motion as Motion } from "framer-motion";
import { fadeUp, stagger } from "@/animations";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineCalendar,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/authServices";
import { getFakeUsername } from "../../../lib/fakeUsers";

function Register() {
  const [showPasswords, setShowPasswords] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayedUsernames] = useState(() => {
    const randomIds = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 100) + 1
    );
    return randomIds.map((id) => getFakeUsername(id));
  });
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

  // Rotate through displayed usernames
  useEffect(() => {
    if (displayedUsernames.length === 0) return;
    const interval = setInterval(() => {
      setCurrentUserIndex((prev) => (prev + 1) % displayedUsernames.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayedUsernames]);

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
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <Motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        <Card
          className="rounded-3xl border-0 overflow-hidden"
          style={{
            background: "#ffffff",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(16,185,129,0.08)",
          }}
        >
          <CardBody className="p-8 sm:p-12 space-y-8">
            {/* Header */}
            <Motion.div variants={fadeUp} className="text-center space-y-3">
              <Motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-4"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </Motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Join Aura Today
              </h2>
              <p className="text-base text-gray-500">
                Create your account and start connecting
              </p>

              {/* Dynamic username display */}
              {displayedUsernames.length > 0 && (
                <Motion.div
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Motion.span
                    key={currentUserIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-semibold text-emerald-600"
                  >
                    {displayedUsernames[currentUserIndex]}
                  </Motion.span>
                  <span className="text-gray-400">just joined!</span>
                </Motion.div>
              )}
            </Motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                {/* Full Name */}
                <Motion.div variants={fadeUp}>
                  <Input
                    {...register("name")}
                    label="Full Name"
                    variant="bordered"
                    errorMessage={errors.name?.message}
                    isInvalid={Boolean(errors.name)}
                    radius="lg"
                    size="lg"
                    classNames={{
                      inputWrapper:
                        "border-gray-300 bg-white hover:border-emerald-500 data-[hover=true]:border-emerald-500 group-data-[focus=true]:border-emerald-600 shadow-sm",
                      input: "text-gray-900 placeholder:text-gray-400",
                      label: "text-gray-600",
                    }}
                    startContent={
                      <HiOutlineUser className="text-emerald-500 text-xl" />
                    }
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
                    size="lg"
                    classNames={{
                      inputWrapper:
                        "border-gray-300 bg-white hover:border-emerald-500 data-[hover=true]:border-emerald-500 group-data-[focus=true]:border-emerald-600 shadow-sm",
                      input: "text-gray-900 placeholder:text-gray-400",
                      label: "text-gray-600",
                    }}
                    startContent={
                      <HiOutlineMail className="text-emerald-500 text-xl" />
                    }
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
                    size="lg"
                    classNames={{
                      inputWrapper:
                        "border-gray-300 bg-white hover:border-emerald-500 data-[hover=true]:border-emerald-500 group-data-[focus=true]:border-emerald-600 shadow-sm",
                      input: "text-gray-900 placeholder:text-gray-400",
                      label: "text-gray-600",
                    }}
                    startContent={
                      <HiOutlineLockClosed className="text-emerald-500 text-xl" />
                    }
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPasswords(!showPasswords)}
                        className="focus:outline-none transition-colors"
                      >
                        {showPasswords ? (
                          <HiOutlineEyeOff className="text-emerald-600 text-xl" />
                        ) : (
                          <HiOutlineEye className="text-emerald-600 text-xl" />
                        )}
                      </button>
                    }
                  />
                </Motion.div>

                {/* Repeat Password */}
                <Motion.div variants={fadeUp}>
                  <Input
                    {...register("rePassword")}
                    label="Confirm Password"
                    errorMessage={errors.rePassword?.message}
                    isInvalid={Boolean(errors.rePassword)}
                    type={showPasswords ? "text" : "password"}
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    classNames={{
                      inputWrapper:
                        "border-gray-300 bg-white hover:border-emerald-500 data-[hover=true]:border-emerald-500 group-data-[focus=true]:border-emerald-600 shadow-sm",
                      input: "text-gray-900 placeholder:text-gray-400",
                      label: "text-gray-600",
                    }}
                    startContent={
                      <HiOutlineLockClosed className="text-emerald-500 text-xl" />
                    }
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPasswords(!showPasswords)}
                        className="focus:outline-none transition-colors"
                      >
                        {showPasswords ? (
                          <HiOutlineEyeOff className="text-emerald-600 text-xl" />
                        ) : (
                          <HiOutlineEye className="text-emerald-600 text-xl" />
                        )}
                      </button>
                    }
                  />
                </Motion.div>

                {/* Gender and Date of Birth in a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Gender */}
                  <Motion.div variants={fadeUp}>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Gender
                    </label>
                    <select
                      {...register("gender")}
                      className={`w-full border rounded-lg px-4 py-3 text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.gender
                          ? "border-red-400"
                          : "border-gray-300 hover:border-emerald-500"
                      }`}
                    >
                      <option value="" style={{ background: "#ffffff" }}>
                        Select gender
                      </option>
                      <option value="male" style={{ background: "#ffffff" }}>
                        Male
                      </option>
                      <option value="female" style={{ background: "#ffffff" }}>
                        Female
                      </option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </Motion.div>

                  {/* Date of Birth */}
                  <Motion.div variants={fadeUp}>
                    <Input
                      {...register("dateOfBirth")}
                      type="date"
                      label="Date of Birth"
                      variant="bordered"
                      radius="lg"
                      size="lg"
                      isInvalid={Boolean(errors.dateOfBirth)}
                      errorMessage={errors.dateOfBirth?.message}
                      classNames={{
                        inputWrapper:
                          "border-gray-300 bg-white hover:border-emerald-500 data-[hover=true]:border-emerald-500 group-data-[focus=true]:border-emerald-600 shadow-sm",
                        input: "text-gray-900",
                        label: "text-gray-600",
                      }}
                      startContent={
                        <HiOutlineCalendar className="text-emerald-500 text-xl" />
                      }
                    />
                  </Motion.div>
                </div>

                {/* Submit Button */}
                <Motion.div variants={fadeUp}>
                  <Button
                    className="w-full bg-linear-to-r from-emerald-700 to-teal-900 text-white font-semibold hover:from-emerald-700 hover:to-teal-900 shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                    type="submit"
                    radius="lg"
                  >
                    Create Account
                  </Button>
                </Motion.div>
              </Motion.div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                Sign in instead →
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <Motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-600 text-sm text-center font-medium bg-emerald-50 py-3 rounded-lg"
              >
                {successMessage}
              </Motion.p>
            )}

            {/* Error Message */}
            {errorMessage && (
              <Motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm text-center font-medium bg-red-50 py-3 rounded-lg"
              >
                {errorMessage}
              </Motion.p>
            )}
          </CardBody>
        </Card>
      </Motion.div>
    </div>
  );
}

export default Register;
