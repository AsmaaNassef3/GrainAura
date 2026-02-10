import { Outlet } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi";

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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
      <Motion.div
        className="hidden lg:flex lg:col-span-1 relative items-center justify-center
        bg-linear-to-br from-emerald-700 via-emerald-800 to-slate-900 text-white overflow-hidden"
        variants={fadeSide}
        initial="hidden"
        animate="visible"
      >
        <div className="relative z-10 p-10 max-w-sm space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <HiOutlineSparkles className="text-emerald-300 text-2xl animate-pulse" />
            <span>Aura</span>
          </div>

          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-emerald-300">Aura</span>
          </h1>

          <p className="text-sm text-emerald-100">
            A calm space for meaningful conversations.
          </p>
        </div>
      </Motion.div>

      <div className="lg:col-span-2 bg-slate-50 flex flex-col justify-between">
        <Outlet />

        <footer className="text-center text-xs text-slate-400 py-6">
          © 2026 Aura · Privacy · Support
        </footer>
      </div>
    </div>
  );
}

export default AuthLayout;
