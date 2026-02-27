import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Avatar,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { FaThumbsUp, FaComment, FaShare, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  getSinglePost,
  getPostComments,
  addComment,
} from "../../services/PostsServices";
import PostCardSkeleton from "../Skeleton/Skeleton";

const DEFAULT_AVATAR = "https://i.pravatar.cc/100?img=";

export default function PostModal({ isOpen, onClose, postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (isOpen && postId) {
      async function fetchPostData() {
        setLoading(true);
        setImageLoaded(false);
        try {
          const [postRes, commentsRes] = await Promise.all([
            getSinglePost(postId),
            getPostComments(postId),
          ]);
          setPost(postRes.data);
          setComments(commentsRes.data?.comments || []);
        } catch (err) {
          console.error("Error fetching post data:", err);
        } finally {
          setLoading(false);
        }
      }
      fetchPostData();
    }
  }, [isOpen, postId]);

  async function handleSendComment() {
    if (!commentText.trim() || sending) return;

    setSending(true);
    try {
      const res = await addComment(postId, {
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-md",
        base: "bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl",
        closeButton: "hover:bg-black/5 active:bg-black/10 transition-colors",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b border-gray-100 pb-4">
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Avatar
                    src={`https://picsum.photos/seed/${post?.userId}/100`}
                    name={`User ${post?.userId}`}
                    size="lg"
                    classNames={{
                      base: "ring-2 ring-emerald-500/20",
                    }}
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900">
                      User {post?.userId || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-500">@user{post?.userId}</p>
                  </div>
                </div>
              )}
            </ModalHeader>

            <ModalBody className="py-6">
              {loading ? (
                <PostCardSkeleton />
              ) : (
                <div className="space-y-6">
                  {/* Post Body */}
                  <div className="space-y-4">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {post?.body}
                    </p>

                    {/* Post Image - Same as PostCard */}
                    <div className="relative w-full rounded-xl overflow-hidden bg-gray-100">
                      {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      <img
                        src={`https://picsum.photos/600/400?random=${post?.id}`}
                        alt="Post content"
                        className="w-full h-auto object-contain max-h-[500px] mx-auto"
                        onLoad={() => setImageLoaded(true)}
                        style={{ display: imageLoaded ? "block" : "none" }}
                      />
                    </div>

                    {/* Post Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors">
                          <FaThumbsUp size={18} />
                          <span className="text-sm font-medium">
                            {post?.reactions?.likes || 0}
                          </span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaComment size={18} />
                          <span className="text-sm font-medium">
                            {comments.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaShare size={18} />
                          <span className="text-sm font-medium">
                            {post?.reactions?.dislikes || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Comment Input */}
                  <div className="pt-4 pb-2 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={`${DEFAULT_AVATAR}0`}
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

                  {/* Comments Section */}
                  {comments.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-900">
                        Comments ({comments.length})
                      </h4>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex gap-3 p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                          >
                            <Avatar
                              src={`https://i.pravatar.cc/100?img=${
                                comment.user?.id || 1
                              }`}
                              name={comment.user?.username}
                              size="sm"
                              classNames={{
                                base: "ring-2 ring-emerald-500/10",
                              }}
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-gray-900">
                                  {comment.user?.username || "Anonymous"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">
                                {comment.body}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
