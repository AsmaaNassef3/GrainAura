// Sidebar.jsx
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useContext } from "react";
import {
  FaHome,
  FaUserFriends,
  FaUsers,
  FaShoppingBag,
  FaBookmark,
  FaNewspaper,
  FaHeart,
  FaBell,
  FaComments,
  FaCompass,
  FaCog,
} from "react-icons/fa";
import { UserContext } from "../../context/UserDataContext";
import { Link } from "react-router-dom";

const menuItems = [
  {
    icon: <FaHome />,
    label: "Home",
    path: "/home",
    active: true,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: <FaUserFriends />,
    label: "Friends",
    color: "text-blue-600 bg-blue-50",
  },
  { icon: <FaUsers />, label: "Groups", color: "text-purple-600 bg-purple-50" },
  {
    icon: <FaShoppingBag />,
    label: "Marketplace",
    color: "text-orange-600 bg-orange-50",
  },
  { icon: <FaBookmark />, label: "Saved", color: "text-pink-600 bg-pink-50" },
  { icon: <FaNewspaper />, label: "Pages", color: "text-cyan-600 bg-cyan-50" },
  { icon: <FaHeart />, label: "Favourites", color: "text-red-600 bg-red-50" },
  {
    icon: <FaBell />,
    label: "Notifications",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    icon: <FaComments />,
    label: "Messages",
    color: "text-indigo-600 bg-indigo-50",
  },
  { icon: <FaCompass />, label: "Explore", color: "text-teal-600 bg-teal-50" },
  { icon: <FaCog />, label: "Settings", color: "text-gray-600 bg-gray-100" },
];

export default function Sidebar() {
  const { userData } = useContext(UserContext);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-4"
    >
      {/* User profile quick link */}
      <Link to="/profile">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer mb-1">
          <img
            src={
              userData?.image ||
              userData?.avatar ||
              "https://i.pravatar.cc/100?img=1"
            }
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-100"
          />
          <span className="font-semibold text-gray-900 text-sm">
            {userData?.name ||
              userData?.firstName ||
              userData?.username ||
              "Your Profile"}
          </span>
        </div>
      </Link>

      {menuItems.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          label={item.label}
          active={item.active}
          color={item.color}
        />
      ))}

      <div className="h-px bg-gray-200 my-3" />

      <p className="text-xs text-gray-500 px-3 py-1">
        © 2026 Aura · Privacy · Terms
      </p>
    </motion.div>
  );
}

function SidebarItem({ icon, label, active, color }) {
  const parts = color ? color.split(" ") : ["text-gray-600", "bg-gray-100"];
  const iconColor = parts[0] || "text-gray-600";
  const bgColor = parts[1] || "bg-gray-100";

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
        active ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
      }`}
    >
      <span
        className={`w-9 h-9 rounded-full ${bgColor} flex items-center justify-center ${iconColor} text-lg shrink-0`}
      >
        {icon}
      </span>
      <span className="text-gray-800 text-sm font-medium">{label}</span>
    </div>
  );
}
