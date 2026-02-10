

import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";

import { motion as Motion } from "framer-motion";
import { fadeUp, stagger } from "@/animations";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUserGroup,
} from "react-icons/hi";

function Register() {
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
            <Motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <Motion.div variants={fadeUp}>
                <Input
                  label="Full Name"
                  variant="bordered"
                  radius="lg"
                  startContent={<HiOutlineUser className="text-slate-400" />}
                />
              </Motion.div>

              <Motion.div variants={fadeUp}>
                <Input
                  label="Email Address"
                  type="email"
                  variant="bordered"
                  radius="lg"
                  startContent={<HiOutlineMail className="text-slate-400" />}
                />
              </Motion.div>

              <Motion.div variants={fadeUp}>
                <Select
                  label="Gender"
                  variant="bordered"
                  radius="lg"
                  startContent={
                    <HiOutlineUserGroup className="text-slate-400" />
                  }
                >
                  <SelectItem key="male">Male</SelectItem>
                  <SelectItem key="female">Female</SelectItem>
                  <SelectItem key="other">Other</SelectItem>
                </Select>
              </Motion.div>

              <Motion.div variants={fadeUp}>
                <Input
                  label="Password"
                  type="password"
                  variant="bordered"
                  radius="lg"
                  startContent={
                    <HiOutlineLockClosed className="text-slate-400" />
                  }
                />
              </Motion.div>

              <Motion.div variants={fadeUp}>
                <Input
                  label="Repeat Password"
                  type="password"
                  variant="bordered"
                  radius="lg"
                  startContent={
                    <HiOutlineLockClosed className="text-slate-400" />
                  }
                />
              </Motion.div>

              <Motion.div variants={fadeUp}>
                <Button
                  className="w-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                  size="lg"
                  radius="lg"
                >
                  Get Started
                </Button>
              </Motion.div>
            </Motion.div>
          </CardBody>
        </Card>
      </Motion.div>
    </div>
  );
}

export default Register