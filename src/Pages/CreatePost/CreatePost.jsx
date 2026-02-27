// CreatePost.jsx
import { useState } from "react";
import { Card, CardBody, Input, Button } from "@heroui/react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaImage, FaVideo, FaSmile } from "react-icons/fa";
import CreatePostModal from "./CreatePostModal";

export default function CreatePost({ onPostCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-md rounded-2xl bg-white border border-gray-100 mb-6">
        <CardBody className="p-4">
          {/* Top Section - Avatar and Input */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border border-gray-200"
            />
            <div
              onClick={() => setIsModalOpen(true)}
              className="flex-1 cursor-pointer"
            >
              <Input
                placeholder="What's on your mind Asmaa?"
                radius="full"
                className="flex-1 pointer-events-none"
                classNames={{
                  inputWrapper:
                    "bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all",
                  input: "text-gray-700 placeholder:text-gray-400 text-sm",
                }}
                readOnly
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-4" />

          {/* Bottom Section - Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-300 font-medium text-sm"
              >
                <FaImage className="text-blue-500" size={18} />
                <span className="hidden sm:inline">Photo</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-300 font-medium text-sm"
              >
                <FaVideo className="text-red-500" size={18} />
                <span className="hidden sm:inline">Video</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition-colors duration-300 font-medium text-sm"
              >
                <FaSmile className="text-yellow-500" size={18} />
                <span className="hidden sm:inline">Activity</span>
              </motion.button>
            </div>

            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 rounded-full transition-all duration-300 hover:scale-105">
              Post
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={onPostCreated}
      />
    </motion.div>
  );
}
