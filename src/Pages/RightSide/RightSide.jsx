// RightSide.jsx
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaBirthdayCake, FaFire } from "react-icons/fa";

const activeFriends = [
  {
    name: "Thomas Müller",
    avatar: "https://i.pravatar.cc/100?img=2",
    online: true,
  },
  {
    name: "Sophia Loren",
    avatar: "https://i.pravatar.cc/100?img=3",
    online: true,
  },
  {
    name: "David Chen",
    avatar: "https://i.pravatar.cc/100?img=4",
    online: false,
  },
  {
    name: "Isabella Ross",
    avatar: "https://i.pravatar.cc/100?img=5",
    online: true,
  },
];

const activities = [
  { name: "Julian", action: "liked your photo", time: "1min ago" },
  { name: "Marc", action: "mentioned you in a comment", time: "40min ago" },
  { name: "You", action: "joined Design Luxury Collective", time: "3h ago" },
];

const trendingTopics = [
  { tag: "#Minimalism", posts: "29k posts this week" },
  { tag: "#EcoTech", posts: "18k posts this week" },
  { tag: "#DigitalDesign", posts: "5.2k posts this week" },
];

export default function RightSide() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 sticky top-4"
    >
      {/* Birthdays Section */}
      <Card className="shadow-md rounded-2xl bg-white border border-gray-100">
        <CardBody className="p-4">
          <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
            <span className="text-lg">🎂</span> Birthdays
          </h4>
          <div className="space-y-3">
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 transition-all cursor-pointer"
            >
              <span className="text-2xl animate-bounce">🎉</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  Sarah Jenkins
                </p>
                <p className="text-xs text-gray-500">
                  Celebrating 25 years today
                </p>
              </div>
            </motion.div>
          </div>
        </CardBody>
      </Card>

      {/* Latest Activity */}
      <Card className="shadow-md rounded-2xl bg-white border border-gray-100">
        <CardBody className="p-4">
          <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
            <span className="text-lg">📍</span> Latest Activity
          </h4>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 4 }}
                className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-900">
                    <span className="font-semibold">{activity.name}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Trending Topics */}
      <Card className="shadow-md rounded-2xl bg-white border border-gray-100">
        <CardBody className="p-4">
          <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
            <FaFire className="text-orange-500 animate-pulse" size={16} />
            Trending Topics
          </h4>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 4, backgroundColor: "rgba(243, 244, 246, 1)" }}
                className="p-3 rounded-lg cursor-pointer transition-all"
              >
                <p className="font-semibold text-emerald-600 text-sm hover:text-emerald-700">
                  {topic.tag}
                </p>
                <p className="text-xs text-gray-500">{topic.posts}</p>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Active Friends */}
      <Card className="shadow-md rounded-2xl bg-white border border-gray-100">
        <CardBody className="p-4">
          <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
            <span className="text-lg">👥</span> Active Friends
          </h4>
          <div className="space-y-2">
            {activeFriends.map((friend, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                  />
                  {friend.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {friend.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {friend.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
