import { Avatar } from "@heroui/react";
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaHeart,
  FaLightbulb,
  FaPaperPlane,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { FiMoreHorizontal, FiTrash2, FiEdit3 } from "react-icons/fi";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useContext } from "react";
import {
  getPostComments,
  deletePost,
  deleteComment,
  updateComment,
} from "../../services/PostsServices";
import { UserContext } from "../../context/UserDataContext";
import { createPortal } from "react-dom";
import { getFakeUsername, getFakeHandle } from "../../lib/fakeUsers";
import Swal from "sweetalert2";

const DEFAULT_AVATAR = "https://i.pravatar.cc/100?img=";

export default function PostCards({
  post,
  onViewMoreComments,
  onEditPost,
  onDeletePost,
}) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const { userData } = useContext(UserContext);

  const isOwner =
    userData?.id != null &&
    post?.userId != null &&
    String(userData.id) === String(post.userId);

  const likesCount = post?.reactions?.likes ?? 0;
  const commentsCount = comments.length;
  const firstComment = comments[0];
  const extraCount = commentsCount > 1 ? commentsCount - 1 : 0;

  const MAX_BODY_LENGTH = 120;
  const isBodyLong = post?.body?.length > MAX_BODY_LENGTH;
  const displayBody = isBodyLong
    ? post.body.slice(0, MAX_BODY_LENGTH) + "..."
    : post?.body;

  // Calculate menu position when opening
  useEffect(() => {
    if (menuOpen && menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 150,
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    function handleOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleOutside);
      return () => document.removeEventListener("mousedown", handleOutside);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (post?.id) {
      async function fetchComments() {
        setLoadingComments(true);
        try {
          const res = await getPostComments(post.id);
          setComments(res.data?.comments || []);
        } catch {
          // fetch failed – show no comments
        } finally {
          setLoadingComments(false);
        }
      }
      fetchComments();
    }
  }, [post?.id]);

  function handleSendComment() {
    if (!commentText.trim() || sending) return;
    setSending(true);
    const newComment = {
      id: Date.now(),
      body: commentText,
      userId: userData?.id,
      user: {
        id: userData?.id,
        username: userData?.username || "You",
        avatar: userData?.avatar,
      },
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
    setSending(false);
  }

  async function handleDeletePost() {
    const result = await Swal.fire({
      title: "Delete Post?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    setMenuOpen(false);
    setDeletingPost(true);
    try {
      if (post.id <= 100) {
        await deletePost(post.id);
      }
      onDeletePost?.(post.id);
    } catch {
      onDeletePost?.(post.id);
    } finally {
      setDeletingPost(false);
    }
  }

  function handleDeleteComment(commentId) {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  function handleUpdateComment(commentId, newBody) {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, body: newBody } : c))
    );
  }

  if (!post) return null;

  return (
    <>
      <div className="bg-white mb-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Post Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={
                    post.authorAvatar ||
                    (isOwner
                      ? userData?.image ||
                        userData?.avatar ||
                        `https://picsum.photos/seed/${post.userId}/100`
                      : `https://picsum.photos/seed/${post.userId}/100`)
                  }
                  alt="author"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {post.authorName ||
                    (isOwner
                      ? userData?.name ||
                        userData?.username ||
                        getFakeUsername(post.userId)
                      : getFakeUsername(post.userId))}
                </h4>
                <p className="text-xs text-gray-500">
                  {isOwner
                    ? `@${userData?.username || "you"}`
                    : getFakeHandle(post.userId)}{" "}
                  · Just now · 🌍
                </p>
              </div>
            </div>

            {isOwner && (
              <div className="relative">
                <button
                  ref={menuButtonRef}
                  onClick={() => setMenuOpen((v) => !v)}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <FiMoreHorizontal size={20} />
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-800 text-sm leading-relaxed mt-3">
            {displayBody}
            {isBodyLong && (
              <button
                onClick={() => onViewMoreComments(post.id)}
                className="text-gray-600 hover:text-gray-800 font-medium ml-1 transition-colors"
              >
                See more
              </button>
            )}
          </p>
        </div>

        {/* Post Image with hover effect */}
        {(post.localImage ||
          `https://picsum.photos/600/400?random=${post.id}`) && (
          <div className="w-full overflow-hidden bg-black">
            <Motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={
                post.localImage ||
                `https://picsum.photos/600/400?random=${post.id}`
              }
              alt="Post"
              className="w-full object-cover cursor-pointer"
              style={{ maxHeight: "600px" }}
            />
          </div>
        )}

        {/* Post Stats */}
        <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500">
                <FaThumbsUp size={10} className="text-white" />
              </span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500">
                <FaHeart size={10} className="text-white" />
              </span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500">
                <FaLightbulb size={10} className="text-white" />
              </span>
            </div>
            <span className="ml-1 hover:underline cursor-pointer">
              {likesCount}
            </span>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="hover:underline cursor-pointer">
              {commentsCount} comment{commentsCount !== 1 ? "s" : ""}
            </span>
            <span className="hover:underline cursor-pointer">
              {post.reactions?.dislikes ?? 0} shares
            </span>
          </div>
        </div>

        {/* Post Actions */}
        <div className="border-t border-gray-100 px-4 py-1 flex justify-around">
          <ActionButton
            icon={<FaThumbsUp />}
            label="Like"
            iconClassName="text-blue-500"
          />
          <ActionButton
            icon={<FaComment />}
            label="Comment"
            iconClassName="text-emerald-500"
          />
          <ActionButton
            icon={<FaShare />}
            label="Share"
            iconClassName="text-emerald-500"
          />
        </div>

        {/* Add Comment Input */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            <Avatar
              src={
                userData?.image ||
                userData?.avatar ||
                `${DEFAULT_AVATAR}${userData?.id || 1}`
              }
              size="sm"
              className="shrink-0"
            />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendComment();
                  }
                }}
                disabled={sending}
                className="w-full px-4 py-2 pr-12 rounded-full bg-gray-100 hover:bg-gray-200 focus:bg-gray-100 transition-colors text-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendComment}
                disabled={!commentText.trim() || sending}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaPaperPlane size={12} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Comments Preview */}
        <div className="px-4 pb-3 space-y-2">
          {loadingComments ? (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0" />
              <div className="bg-gray-100 rounded-2xl px-3 py-2 flex-1 h-12 animate-pulse" />
            </div>
          ) : firstComment ? (
            <>
              <CommentItem
                comment={firstComment}
                loggedUserId={userData?.id}
                onDelete={handleDeleteComment}
                onUpdate={handleUpdateComment}
              />

              {extraCount > 0 && (
                <button
                  onClick={() => onViewMoreComments(post.id)}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium pl-10"
                >
                  View {extraCount} more comment{extraCount !== 1 ? "s" : ""}
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>

      {/* Dropdown Menu Portal */}
      {menuOpen &&
        createPortal(
          <AnimatePresence>
            <Motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
                zIndex: 9999,
              }}
              className="w-44 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEditPost && onEditPost(post);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FiEdit3 size={15} className="text-emerald-600" />
                Edit Post
              </button>
              <div className="h-px bg-gray-200" />
              <button
                onClick={handleDeletePost}
                disabled={deletingPost}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <FiTrash2 size={15} />
                {deletingPost ? "Deleting…" : "Delete Post"}
              </button>
            </Motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

function CommentItem({ comment, loggedUserId, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.body || "");
  const [saving, setSaving] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const editRef = useRef(null);

  const commentOwnerId = comment.user?.id ?? comment.userId;
  const isOwner =
    loggedUserId && String(loggedUserId) === String(commentOwnerId);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 120,
      });
    }
  }, [open]);

  useEffect(() => {
    function handleOutside(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleOutside);
      return () => document.removeEventListener("mousedown", handleOutside);
    }
  }, [open]);

  useEffect(() => {
    if (editing) editRef.current?.focus();
  }, [editing]);

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Delete Comment?",
      text: "This comment will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    setOpen(false);
    try {
      if (comment.id && comment.id <= 340) {
        await deleteComment(comment.id);
      }
    } catch (e) {
      void e; // comment may be local-only
    }
    onDelete?.(comment.id);
  }

  async function handleSaveEdit() {
    if (!editText.trim() || saving) return;
    setSaving(true);
    try {
      if (comment.id && comment.id <= 340) {
        await updateComment(comment.id, editText.trim());
      }
      onUpdate?.(comment.id, editText.trim());
    } catch {
      onUpdate?.(comment.id, editText.trim());
    } finally {
      setSaving(false);
      setEditing(false);
    }
  }

  function handleCancelEdit() {
    setEditText(comment.body || "");
    setEditing(false);
  }

  const avatarSrc =
    comment.user?.avatar ||
    `${DEFAULT_AVATAR}${comment.user?.id || comment.userId || 1}`;
  const displayName = comment.user?.username ?? `User ${commentOwnerId ?? ""}`;

  return (
    <>
      <div className="flex items-start gap-2">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl px-3 py-2 inline-block max-w-full">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900">
                  {displayName}
                </p>
                {editing ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      ref={editRef}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit();
                        if (e.key === "Escape") handleCancelEdit();
                      }}
                      className="flex-1 text-sm px-2 py-1 rounded bg-white border border-emerald-300 focus:ring-2 focus:ring-emerald-400 outline-none"
                    />
                    <button
                      onClick={handleSaveEdit}
                      disabled={saving || !editText.trim()}
                      className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 disabled:opacity-50"
                    >
                      {saving ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FaCheck size={9} />
                      )}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-400"
                    >
                      <FaTimes size={9} />
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-800 leading-relaxed wrap-break-word">
                    {comment.body}
                  </p>
                )}
              </div>

              {isOwner && !editing && (
                <button
                  ref={buttonRef}
                  onClick={() => setOpen((v) => !v)}
                  className="p-1 rounded-full text-gray-400 hover:bg-gray-200 transition-colors shrink-0"
                >
                  <FiMoreHorizontal size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Dropdown Menu Portal */}
      {open &&
        createPortal(
          <AnimatePresence>
            <Motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              style={{
                position: "absolute",
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
                zIndex: 9999,
              }}
              className="w-36 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => {
                  setOpen(false);
                  setEditing(true);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FiEdit3 size={12} className="text-emerald-600" />
                Edit
              </button>
              <div className="h-px bg-gray-200" />
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiTrash2 size={12} />
                Delete
              </button>
            </Motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

function ActionButton({ icon, label, iconClassName }) {
  return (
    <button className="flex items-center justify-center gap-2 px-4 py-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 text-gray-600 hover:text-gray-900 text-sm font-medium flex-1 group">
      <span
        className={`transition-transform duration-200 group-hover:scale-110 ${
          iconClassName || ""
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
