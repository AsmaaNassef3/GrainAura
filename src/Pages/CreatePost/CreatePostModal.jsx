// CreatePostModal.jsx
import { useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FaImage, FaTimes } from "react-icons/fa";
import { createPost } from "../../services/PostsServices";

export default function CreatePostModal({ isOpen, onClose, onPostCreated }) {
  // State
  const [postText, setPostText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInput = useRef(null);
  const userTextareaRef = useRef(null);

  // Event Handlers
  function chooseFile() {
    const file = fileInput.current.files[0];
    setSelectedFile(file);
  }

  const handleClose = () => {
    setPostText("");
    setSelectedFile(null);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setPostText("");
      setSelectedFile(null);
      onClose();
    }
  };

  async function CreatePost() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", userTextareaRef.current.value || "Untitled Post");
    formData.append("body", userTextareaRef.current.value || "No content");
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    formData.append("userId", 1);
    try {
      const { data } = await createPost(formData);
      console.log("Post created:", data);

      // The dummy API doesn't persist posts — we add it locally to the UI.
      // Attach the uploaded file as a local preview URL so PostCards can display it.
      if (onPostCreated) {
        onPostCreated({
          ...data,
          _isLocal: true,
          localImage: selectedFile ? URL.createObjectURL(selectedFile) : null,
        });
      }

      setPostText("");
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // UI helpers
  const textareaBase =
    "w-full text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none text-lg transition-all duration-300";
  const textareaLarge = "min-h-40 p-5";
  const textareaSmall = "min-h-20 p-3";

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <Motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Create Post</h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <FaTimes className="text-gray-600" size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full border-2 border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-800">Asmaa</p>
                  <p className="text-xs text-gray-500">Public</p>
                </div>
              </div>

              {/* Textarea & Image Preview */}
              <div
                className={`flex flex-col ${selectedFile ? "gap-3" : "gap-5"}`}
              >
                <textarea
                  ref={userTextareaRef}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="What's on your mind?"
                  className={
                    textareaBase +
                    " " +
                    (selectedFile ? textareaSmall : textareaLarge)
                  }
                  autoFocus
                />
                {selectedFile && (
                  <div className="w-full flex justify-center">
                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-md max-w-xs w-full transition-all duration-300">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        className="w-full h-auto object-cover rounded-xl"
                        style={{ maxHeight: 200 }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Post Section */}
              <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-white/60 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    Add to your post
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                      title="Add Photo"
                      onClick={() => fileInput.current.click()}
                    >
                      <FaImage className="text-green-500" size={20} />
                      <input
                        onChange={chooseFile}
                        ref={fileInput}
                        type="file"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <Button
                onPress={CreatePost}
                isLoading={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                size="lg"
              >
                Create Post
              </Button>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
