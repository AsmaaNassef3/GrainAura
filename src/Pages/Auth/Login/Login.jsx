import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { loginUser } from "../../../services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/Scema/authScema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

function Login() {
  const [showPasswords, setShowPasswords] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = React.useContext(AuthContext);
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

  async function onSubmit(LoginData) {
    console.log(LoginData);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      // Call the loginUser function from authServices with the form data
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
    <>
      <div className="flex-1 flex items-center justify-center px-2 py-12">
        <Motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Card className="w-full max-w-lg rounded-2xl shadow-xl">
            <CardBody className="p-8 space-y-6">
              {/* Header */}
              <Motion.div variants={fadeUp} className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  Sign in to your Aura account
                </h2>
                <p className="text-sm text-slate-500">
                  Let’s begin something meaningful
                </p>
              </Motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
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
                      startContent={
                        <HiOutlineMail className="text-slate-400" />
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
                      startContent={
                        <HiOutlineLockClosed className="text-slate-400" />
                      }
                      endContent={
                        <button
                          type="button"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="focus:outline-none"
                        >
                          {showPasswords ? (
                            <HiOutlineEyeOff
                              className="text-slate-400"
                              size={20}
                            />
                          ) : (
                            <HiOutlineEye
                              className="text-slate-400"
                              size={20}
                            />
                          )}
                        </button>
                      }
                    />
                  </Motion.div>

                  {/* Submit Button */}
                  <Motion.div variants={fadeUp}>
                    <Button
                      className="w-full bg-emerald-800 text-white font-semibold hover:bg-emerald-700"
                      size="lg"
                      type="submit"
                      radius="lg"
                    >
                      Get Started
                    </Button>
                  </Motion.div>
                </Motion.div>
              </form>
              <div className="text-center">
                <p className="text-sm text-slate-500">
                  Don’t have an account?{" "}
                  <a
                  onClick={() => navigate("/register")}
                    className="text-emerald-600 font-medium hover:underline cursor-pointer"
                  >
                    Sign Up
                  </a>
                </p>
              </div>

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
    </>
  );
}

export default Login;
