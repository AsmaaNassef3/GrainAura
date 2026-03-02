import { Outlet } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import AuthSidePanel from "../components/AuthSidePanel/AuthSidePanel";

const fadeSide = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5">
      {/* Animated Side Panel - Hidden on small screens */}
      <Motion.div
        className="hidden lg:flex lg:col-span-2 overflow-hidden h-screen"
        style={{ position: "fixed", top: 0, width: "40%" }}
        variants={fadeSide}
        initial="hidden"
        animate="visible"
      >
        <AuthSidePanel />
      </Motion.div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 lg:col-start-3 bg-linear-to-br from-slate-50 via-white to-slate-50 flex flex-col justify-between">
        <Outlet />

        <footer className="text-center text-xs text-slate-400 py-6">
          © 2026 Aura · Privacy · Terms · Support
        </footer>
      </div>
    </div>
  );
}

export default AuthLayout;
