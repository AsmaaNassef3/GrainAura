// CreatePostModal.jsx — supports both Create Post and Edit Post
import { useRef, useState, useEffect, useContext } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FaImage, FaTimes } from "react-icons/fa";
import { createPost, updatePost } from "../../services/PostsServices";
import { UserContext } from "../../context/UserDataContext";

/**
 * CreatePostModal
 *
 * Props:
 *  - isOpen        {boolean}   — whether the modal is visible
 *  - onClose       {function}  — callback to close the modal
 *  - onPostCreated {function}  — callback after a NEW post is created  (optional)
 *  - onPostUpdated {function}  — callback after an EXISTING post is updated (optional)
 *  - editPost      {object}    — the post object to edit; omit (or pass null) for create mode
 */
export default function CreatePostModal({
  isOpen,
  onClose,
  onPostCreated,
  onPostUpdated,
  editPost = null,
}) {
  const isEditMode = Boolean(editPost);

  // ── Logged-in user ──────────────────────────────────────────────────────────
  const { userData } = useContext(UserContext);
  const userAvatar =
    userData?.image ||
    userData?.avatar ||
    `https://i.pravatar.cc/150?img=${userData?.id || 1}`;
  const userName = userData?.name || userData?.username || "User";
  const [postText, setPostText] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // URL string for preview
  const [selectedFile, setSelectedFile] = useState(null); // actual File object
  const [isLoading, setIsLoading] = useState(false);

  const fileInput = useRef(null);

  // ── Pre-fill fields whenever the modal opens or the target post changes ──────
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && editPost) {
        setPostText(editPost.body || "");
        // Use localImage if the post was created locally, else fall back to the
        // picsum thumbnail we already show in PostCards.
        setImagePreview(
          editPost.localImage ||
            `https://picsum.photos/600/400?random=${editPost.id}`
        );
      } else {
        setPostText("");
        setImagePreview(null);
      }
      setSelectedFile(null);
    }
  }, [isOpen, editPost, isEditMode]);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function handleChooseFile() {
    const file = fileInput.current?.files[0];
    if (!file) return;
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function resetAndClose() {
    setPostText("");
    setImagePreview(null);
    setSelectedFile(null);
    onClose();
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) resetAndClose();
  }

  // ── Submit: create or update ─────────────────────────────────────────────────
  async function handleSubmit() {
    if (!postText.trim()) return;
    setIsLoading(true);

    try {
      if (isEditMode) {
        const updatedPost = {
          ...editPost,
          body: postText,
          title: editPost.title || postText.slice(0, 60),
          authorName: editPost.authorName || userName,
          authorAvatar: editPost.authorAvatar || userAvatar,
          localImage: selectedFile
            ? URL.createObjectURL(selectedFile)
            : editPost.localImage || null,
        };

        if (editPost.id && editPost.id <= 100) {
          try {
            const { data } = await updatePost(editPost.id, {
              body: postText,
              title: updatedPost.title,
              userId: userData?.id || 1,
            });
            // Merge server response fields but keep our local overrides
            Object.assign(updatedPost, data, {
              body: postText,
              localImage: updatedPost.localImage,
            });
          } catch {
            // API failed (e.g. 404) — silently fall through; UI update still happens
          }
        }

        onPostUpdated?.(updatedPost);
      } else {
        // ── CREATE ────────────────────────────────────────────────────────────
        const formData = new FormData();
        formData.append("title", postText.slice(0, 60) || "Untitled Post");
        formData.append("body", postText);
        formData.append("userId", userData?.id || 1);
        if (selectedFile) formData.append("image", selectedFile);

        const { data } = await createPost(formData);

        if (onPostCreated) {
          onPostCreated({
            ...data,
            userId: userData?.id || 1,
            _isLocal: true,
            authorName: userName,
            authorAvatar: userAvatar,
            localImage: selectedFile ? URL.createObjectURL(selectedFile) : null,
          });
        }
      }

      resetAndClose();
    } catch (error) {
      console.error(
        isEditMode ? "Error updating post:" : "Error creating post:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  }

  // ── UI helpers ───────────────────────────────────────────────────────────────
  const textareaBase =
    "w-full text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none text-base transition-all duration-300 bg-transparent";
  const textareaSize = imagePreview ? "min-h-20 p-3" : "min-h-40 p-5";

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <Motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Post" : "Create Post"}
              </h2>
              <button
                onClick={resetAndClose}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* ── Body ──────────────────────────────────────────────── */}
            <div className="p-6 flex flex-col gap-5">
              {/* User Info — always from logged-in user */}
              <div className="flex items-center gap-3">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-11 h-11 rounded-full border-2 border-emerald-200 object-cover shadow-sm"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {userName}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 mt-0.5">
                    🌍 Public
                  </span>
                </div>
              </div>

              {/* Textarea */}
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind?"
                className={`${textareaBase} ${textareaSize}`}
                autoFocus
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative w-full flex justify-center">
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-md w-full transition-all duration-300">
                    <img
                      src={imagePreview}
                      alt="Post preview"
                      className="w-full h-auto object-cover rounded-xl"
                      style={{ maxHeight: 220 }}
                    />
                  </div>
                  {/* Remove image button */}
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedFile(null);
                      if (fileInput.current) fileInput.current.value = "";
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gray-900/60 text-white flex items-center justify-center hover:bg-gray-900/80 transition-colors"
                    aria-label="Remove image"
                  >
                    <FaTimes size={11} />
                  </button>
                </div>
              )}

              {/* Add to Post */}
              <div className="p-3 border border-gray-200 rounded-xl bg-gray-50/60">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    Add to your post
                  </span>
                  <button
                    type="button"
                    className="p-2 rounded-full cursor-pointer hover:bg-emerald-50 transition-colors"
                    title="Add Photo"
                    onClick={() => fileInput.current?.click()}
                  >
                    <FaImage className="text-emerald-500" size={20} />
                  </button>
                  <input
                    onChange={handleChooseFile}
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* ── Footer ────────────────────────────────────────────── */}
            <div className="px-6 pb-6">
              <Button
                onPress={handleSubmit}
                isLoading={isLoading}
                isDisabled={!postText.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isEditMode ? "Update" : "Post"}
              </Button>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
