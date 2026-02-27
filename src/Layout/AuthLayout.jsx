import { Outlet } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import Aura from '../../public/images/Screenshot 2026-02-17 at 2.45.18 PM.png'

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
      
      {/* الصورة تغطي نفس مساحة الجزء الأخضر */}
  <Motion.div
  className="hidden lg:flex lg:col-span-1 relative overflow-hidden h-screen"
  variants={fadeSide}
  initial="hidden"
  animate="visible"
>
  <img
    src={Aura}
    alt="Aura panel"
    className="w-full h-full object-cover"
  />
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
