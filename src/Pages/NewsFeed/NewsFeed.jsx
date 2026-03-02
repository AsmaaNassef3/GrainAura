// NewsFeed.jsx
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import Sidebar from "../Sidebar/Sidebar";
import CreatePost from "../CreatePost/CreatePost";
import PostCards from "../PostCards/PostCards";
import RightSide from "../RightSide/RightSide";
import PostCardSkeleton from "../Skeleton/Skeleton";
import PostModal from "../PostModal/PostModal";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { getAllPosts } from "../../services/PostsServices";
import { useEffect, useState } from "react";

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  // Called when the user opens the three-dots "Edit Post" on a post card
  function handleOpenEditModal(post) {
    setEditPost(post);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setEditPost(null);
  }

  // Called by CreatePostModal after a successful update — patch the post in-place
  function handlePostUpdated(updatedPost) {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? { ...p, ...updatedPost } : p))
    );
  }

  // Called by PostCards when a post is deleted
  function handleDeletePost(postId) {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
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
      className="min-h-screen bg-gray-100 p-0 md:p-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-3 pl-4 pt-4 pr-2">
          <Sidebar />
        </div>

        {/* Center Column - Posts Feed */}
        <div className="col-span-1 md:col-span-6 md:px-2">
          <div className="mb-0 pt-4 px-0">
            <CreatePost onPostCreated={addPostToFeed} />
          </div>
          <div className="mt-0">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="mb-4">
                    <PostCardSkeleton />
                  </div>
                ))
              : posts.map((post) => (
                  <PostCards
                    key={post.id}
                    post={post}
                    onViewMoreComments={handleViewMoreComments}
                    onEditPost={handleOpenEditModal}
                    onDeletePost={handleDeletePost}
                  />
                ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-3 pr-4 pt-4 pl-2">
          <RightSide />
        </div>
      </div>

      {/* Post Detail Modal */}
      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        postId={selectedPostId}
      />

      {/* Page-level Edit Post Modal — always centered, covers the full screen */}
      <CreatePostModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        editPost={editPost}
        onPostUpdated={handlePostUpdated}
      />
    </motion.div>
  );
}
