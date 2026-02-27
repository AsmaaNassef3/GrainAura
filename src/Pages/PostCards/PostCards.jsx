import { Card, CardBody, CardFooter, Avatar } from "@heroui/react";
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaHeart,
  FaLightbulb,
  FaPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useState, useEffect } from "react";
import { getPostComments, addComment } from "../../services/PostsServices";

const DEFAULT_AVATAR = "https://i.pravatar.cc/100?img=";

export default function PostCards({ post, onViewMoreComments }) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);

  const likesCount = post?.reactions?.likes ?? 0;
  const commentsCount = comments.length;
  const firstComment = comments[0];
  const extraCount = commentsCount > 1 ? commentsCount - 1 : 0;

  const MAX_BODY_LENGTH = 120;
  const isBodyLong = post?.body?.length > MAX_BODY_LENGTH;
  const displayBody = isBodyLong
    ? post.body.slice(0, MAX_BODY_LENGTH) + "..."
    : post?.body;

  useEffect(() => {
    if (post?.id) {
      async function fetchComments() {
        setLoadingComments(true);
        try {
          const res = await getPostComments(post.id);
          setComments(res.data?.comments || []);
        } catch (err) {
          console.error("Error fetching comments:", err);
        } finally {
          setLoadingComments(false);
        }
      }
      fetchComments();
    }
  }, [post?.id]);

  async function handleSendComment() {
    if (!commentText.trim() || sending) return;

    setSending(true);
    try {
      const res = await addComment(post.id, {
        body: commentText,
        userId: 1, // Default user ID
      });

      // Create new comment object from response
      const newComment = res.data;

      // Prepend new comment to the top of the list
      setComments([newComment, ...comments]);

      // Clear input field
      setCommentText("");
    } catch (err) {
      console.error("Error sending comment:", err);
    } finally {
      setSending(false);
    }
  }

  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="space-y-6"
    >
      <Card className="shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border border-blue-100/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
        {/* ── Post Header ── */}
        <CardBody className="pb-0 pt-5 px-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={`https://picsum.photos/seed/${post.userId}/100`}
                  alt="author"
                  className="w-12 h-12 rounded-full border-2 border-gradient-to-r from-blue-400 to-purple-400 object-cover shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">User {post.userId}</h4>
                <p className="text-xs text-gray-500">@user{post.userId}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.2, rotate: 90 }}
              className="text-gray-400 hover:text-gray-700 transition-all duration-300"
            >
              ⋯
            </motion.button>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {displayBody}
            {isBodyLong && (
              <button
                onClick={() => onViewMoreComments(post.id)}
                className="text-blue-500 hover:text-blue-700 font-semibold ml-2 transition-colors"
              >
                Read more
              </button>
            )}
          </p>

          {/* Post image — use local upload preview if available, else random fallback */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-4 bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={
                post.localImage ||
                `https://picsum.photos/600/400?random=${post.id}`
              }
              alt="Post"
              className="w-full object-cover max-h-72 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </CardBody>

        {/* ── Post Stats ── */}
        <CardBody className="py-3 px-5 border-t border-blue-100/50 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
          <div className="flex items-center justify-between text-xs text-gray-700 font-medium">
            <div className="flex items-center gap-1.5">
              <motion.span
                whileHover={{ scale: 1.15 }}
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-md"
              >
                <FaThumbsUp size={11} className="text-white" />
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.15 }}
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-pink-600 shadow-md"
              >
                <FaHeart size={11} className="text-white" />
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.15 }}
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md"
              >
                <FaLightbulb size={11} className="text-white" />
              </motion.span>
              <span className="ml-1.5 font-semibold text-gray-800">
                {likesCount}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="hover:text-blue-600 transition-colors cursor-pointer">
                {commentsCount} Comment{commentsCount !== 1 ? "s" : ""}
              </span>
              <span className="hover:text-green-600 transition-colors cursor-pointer">
                {post.reactions?.dislikes ?? 0} Shares
              </span>
            </div>
          </div>
        </CardBody>

        {/* ── Post Actions ── */}
        <CardFooter className="flex justify-between px-5 py-3 border-t border-blue-100/50 bg-gradient-to-r from-white to-blue-50/20">
          <ActionButton
            icon={<FaThumbsUp />}
            label="Like"
            color="text-blue-500"
            hoverColor="hover:bg-blue-50"
          />
          <ActionButton
            icon={<FaComment />}
            label="Comment"
            color="text-purple-500"
            hoverColor="hover:bg-purple-50"
          />
          <ActionButton
            icon={<FaShare />}
            label="Share"
            color="text-green-500"
            hoverColor="hover:bg-green-50"
          />
        </CardFooter>

        {/* ── Add Comment Input ── */}
        <div className="px-5 pt-3 pb-2 border-t border-blue-100/50">
          <div className="flex items-center gap-3">
            <Avatar src={`${DEFAULT_AVATAR}0`} size="sm" className="shrink-0" />
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
                className="w-full px-4 py-2 pr-12 rounded-full bg-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendComment}
                disabled={!commentText.trim() || sending}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaPaperPlane size={12} className="text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Comments Preview (first comment only) ── */}
        <div className="px-5 pb-4 space-y-3">
          {loadingComments ? (
            <div className="flex items-start gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse shrink-0" />
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl px-3 py-2 flex-1 h-12 animate-pulse" />
            </div>
          ) : firstComment ? (
            <>
              <div className="flex items-start gap-3 pt-2">
                <img
                  src={`${DEFAULT_AVATAR}${firstComment.user?.id || 1}`}
                  alt={firstComment.user?.username}
                  className="w-8 h-8 rounded-full border-2 border-blue-200 object-cover shrink-0 shadow-sm"
                />
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl px-4 py-2.5 flex-1 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <p className="text-xs font-bold text-gray-900">
                    {firstComment.user?.username ?? "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                    {firstComment.body}
                  </p>
                </div>
              </div>

              {/* "View more comments" → opens PostModal */}
              {extraCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onViewMoreComments(post.id)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold mt-2 px-3 py-1.5 rounded-full bg-blue-100 hover:bg-blue-200 transition-all duration-300"
                >
                  View {extraCount} more comment{extraCount !== 1 ? "s" : ""}
                </motion.button>
              )}
            </>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}

function ActionButton({ icon, label, color, hoverColor }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2.5 cursor-pointer ${color} ${hoverColor} px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
