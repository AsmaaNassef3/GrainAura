import { Card, CardBody, Input, Button } from "@heroui/react";
import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { fadeUp, stagger } from "@/animations";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { loginUser } from "../../../services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/Scema/authScema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { getFakeUsername } from "../../../lib/fakeUsers";

function Login() {
  const [showPasswords, setShowPasswords] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = React.useContext(AuthContext);
  const [displayedUsernames] = useState(() => {
    const randomIds = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 100) + 1
    );
    return randomIds.map((id) => getFakeUsername(id));
  });
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
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

  async function onSubmit(LoginData) {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await loginUser(LoginData);
      if (response.data.message === "success") {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setSuccessMessage("Account created successfully 🎉");
        toast.success("Logged in successfully!");
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(backendMessage);
      setErrorMessage(backendMessage);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <Motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl"
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
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </Motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-base text-gray-500">
                Sign in to continue to Aura
              </p>

              {/* Dynamic username display */}
              {displayedUsernames.length > 0 && (
                <Motion.div
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-gray-400">Join</span>
                  <Motion.span
                    key={currentUserIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-semibold text-emerald-600"
                  >
                    {displayedUsernames[currentUserIndex]}
                  </Motion.span>
                  <span className="text-gray-400">and others</span>
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
                {/* Email */}
                <Motion.div variants={fadeUp}>
                  <Input
                    {...register("email")}
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email}
                    label="Email Address"
                    type="email"
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
                      <HiOutlineMail className="text-emerald-500 text-xl" />
                    }
                  />
                </Motion.div>

                {/* Password */}
                <Motion.div variants={fadeUp}>
                  <Input
                    errorMessage={errors.password?.message}
                    isInvalid={!!errors.password}
                    label="Password"
                    {...register("password")}
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

                {/* Forgot Password */}
                <Motion.div variants={fadeUp} className="text-right">
                  <button
                    type="button"
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </Motion.div>

                {/* Submit Button */}
                <Motion.div variants={fadeUp}>
                  <Button
                    className="w-full bg-linear-to-r from-emerald-700 to-teal-900 text-white font-semibold hover:from-emerald-700 hover:to-teal-900 shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                    type="submit"
                    radius="lg"
                  >
                    Sign In
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
                  New to Aura?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <button
                onClick={() => navigate("/register")}
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                Create an account →
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

export default Login;
