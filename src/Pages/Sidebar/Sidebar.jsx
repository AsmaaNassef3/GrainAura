// Sidebar.jsx
import { Card, CardBody, Button } from "@heroui/react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
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

const menuItems = [
  { icon: <FaHome />, label: "Home", active: true, color: "text-emerald-500" },
  { icon: <FaUserFriends />, label: "Friends", color: "text-blue-500" },
  { icon: <FaUsers />, label: "Groups", color: "text-purple-500" },
  { icon: <FaShoppingBag />, label: "Marketplace", color: "text-orange-500" },
  { icon: <FaBookmark />, label: "Saved", color: "text-pink-500" },
  { icon: <FaNewspaper />, label: "Pages", color: "text-cyan-500" },
  { icon: <FaHeart />, label: "Favourites", color: "text-red-500" },
  { icon: <FaBell />, label: "Notifications", color: "text-yellow-500" },
  { icon: <FaComments />, label: "Messages", color: "text-indigo-500" },
  { icon: <FaCompass />, label: "Explore", color: "text-teal-500" },
  { icon: <FaCog />, label: "Settings", color: "text-gray-500" },
];

export default function Sidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-4 shadow-xl rounded-2xl bg-white border border-gray-100 sticky top-4">
        <CardBody className="space-y-2 px-2">
          <h2 className="text-xl font-bold text-amber-600 mb-6 flex items-center gap-2">
            <span className="text-2xl">🌿</span> Lumina
          </h2>

          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              active={item.active}
              color={item.color}
            />
          ))}

          <Button className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-300 hover:scale-105 rounded-xl py-2">
            + Create Post
          </Button>
        </CardBody>
      </Card>
    </motion.div>
  );
}

function SidebarItem({ icon, label, active, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
        active
          ? "bg-emerald-700 text-white shadow-md"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <span className={`text-xl transition-transform duration-300 ${color}`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </motion.div>
  );
}
