// NewsFeed.jsx
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import Sidebar from "../Sidebar/Sidebar";
import CreatePost from "../CreatePost/CreatePost";
import PostCards from "../PostCards/PostCards";
import RightSide from "../RightSide/RightSide";
import PostCardSkeleton from "../Skeleton/Skeleton";
import PostModal from "../PostModal/PostModal";
import { getAllPosts } from "../../services/PostsServices";
import { useEffect, useState } from "react";

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await getAllPosts();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  // Called by CreatePostModal after a successful post creation.
  // The dummy API doesn't persist data, so we add the new post
  // locally to the top of the list ourselves.
  function addPostToFeed(newPost) {
    setPosts((prev) => [newPost, ...prev]);
  }

  function handleViewMoreComments(postId) {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedPostId(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 p-3 md:p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-3">
          <Sidebar />
        </div>

        {/* Center Column - Posts */}
        <div className="col-span-1 md:col-span-6">
          <CreatePost onPostCreated={addPostToFeed} />
          <div className="space-y-6 mt-6">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))
              : posts.map((post) => (
                  <PostCards
                    key={post.id}
                    post={post}
                    onViewMoreComments={handleViewMoreComments}
                  />
                ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <RightSide />
        </div>
      </div>

      {/* Post Detail Modal */}
      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        postId={selectedPostId}
      />
    </motion.div>
  );
}
