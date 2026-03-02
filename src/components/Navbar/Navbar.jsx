import { useState, useRef, useEffect, useContext } from "react";
import { Avatar, Input, Button } from "@heroui/react";
import {
  FiSearch,
  FiBell,
  FiMessageCircle,
  FiSettings,
  FiLogOut,
  FiHome,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserDataContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { setToken } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { userData } = useContext(UserContext);

  function logOut() {
    console.log("User logged out");
    localStorage.removeItem("token");
    setToken(false);
    setOpen(false);
  }

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm"
              style={{
                background:
                  "linear-gradient(to bottom right, #10b981, #0d9488)",
              }}
            >
              <span className="text-lg font-bold text-white">A</span>
            </div>
            <div className="font-bold text-xl text-gray-900 hidden sm:block">
              Aura
            </div>
          </motion.div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <Input
              placeholder="Explore your network..."
              startContent={<FiSearch className="text-gray-400" size={18} />}
              radius="full"
              classNames={{
                inputWrapper:
                  "bg-gray-100/80 border border-gray-200 hover:border-gray-300 transition-all",
                input: "text-gray-700 placeholder:text-gray-400 text-sm",
              }}
            />
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4" ref={menuRef}>
            {/* Home */}
            <Link to="/home">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
                title="Home"
              >
                <FiHome size={20} />
              </motion.button>
            </Link>

            {/* Messages */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all relative"
              title="Messages"
            >
              <FiMessageCircle size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all relative"
              title="Notifications"
            >
              <FiBell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                onClick={() => setOpen(!open)}
                className="p-1"
              >
                <Avatar
                  src={userData?.image || userData?.avatar}
                  className="ring-2 ring-gray-200 shadow-sm w-10 h-10"
                />
              </motion.button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg p-2 backdrop-blur-sm"
                  >
                    <Link to="/my-profile" onClick={() => setOpen(false)}>
                      <DropdownItem icon="👤" label="My Profile" />
                    </Link>
                    <DropdownItem
                      icon={<FiSettings size={16} />}
                      label="Settings"
                    />
                    <div className="my-1 border-t border-gray-100" />
                    <DropdownItem
                      onClick={logOut}
                      icon={<FiLogOut size={16} />}
                      label="Logout"
                      danger
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Notification Bell */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all relative"
            >
              <FiBell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
              ref={mobileMenuRef}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-100"
            >
              {/* Mobile Search */}
              <div className="mb-4">
                <Input
                  placeholder="Explore your network..."
                  startContent={
                    <FiSearch className="text-gray-400" size={18} />
                  }
                  radius="full"
                  classNames={{
                    inputWrapper:
                      "bg-gray-100/80 border border-gray-200 hover:border-gray-300 transition-all",
                    input: "text-gray-700 placeholder:text-gray-400 text-sm",
                  }}
                />
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-2">
                <Link
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium"
                >
                  <FiHome size={20} /> Home
                </Link>
                <motion.button
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium"
                >
                  <FiMessageCircle size={20} /> Messages
                </motion.button>
                <Link
                  to="/my-profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium"
                >
                  <span>👤</span> My Profile
                </Link>
                <motion.button
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium"
                >
                  <FiSettings size={20} /> Settings
                </motion.button>
                <div className="my-2 border-t border-gray-100" />
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={logOut}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-all text-red-500 font-medium"
                >
                  <FiLogOut size={20} /> Logout
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function DropdownItem({ icon, label, danger, onClick }) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-xl text-sm font-medium transition-all ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </motion.button>
  );
}
