// CreatePost.jsx
import { useContext, useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaImage, FaVideo, FaSmile } from "react-icons/fa";
import CreatePostModal from "./CreatePostModal";
import { UserContext } from "../../context/UserDataContext";

export default function CreatePost({ onPostCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData } = useContext(UserContext);

  const userAvatar =
    userData?.image ||
    userData?.avatar ||
    `https://i.pravatar.cc/150?img=${userData?.id || 1}`;
  const userName =
    userData?.name || userData?.firstName || userData?.username || "Nassef";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        {/* Top Section - Avatar and Input */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={userAvatar}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-100"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 text-left px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm text-gray-500"
          >
            What&apos;s on your mind, {userName.split(" ")[0]}?
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-3" />

        {/* Bottom Section - Buttons */}
        <div className="flex items-center justify-around">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm flex-1 justify-center group"
          >
            <FaImage
              className="text-emerald-500 group-hover:scale-110 transition-transform duration-200"
              size={18}
            />
            <span>Photo</span>
          </button>

          <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm flex-1 justify-center group">
            <FaVideo
              className="text-red-400 group-hover:scale-110 transition-transform duration-200"
              size={18}
            />
            <span>Video</span>
          </button>

          <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm flex-1 justify-center group">
            <FaSmile
              className="text-yellow-400 group-hover:scale-110 transition-transform duration-200"
              size={18}
            />
            <span>Feeling</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={onPostCreated}
      />
    </motion.div>
  );
}
