import axios from "axios";

const DUMMY_API = "https://dummyjson.com";

export function getAllPosts() {
  return axios.get(`${DUMMY_API}/posts?`, {
    params: {
      limit: 15,
      skip: 0,
      select: "title,body,userId",
      sort: "-createdAt",
    },
  });

}

export async function getSinglePost(postId) {
  const response = await axios.get(`${DUMMY_API}/posts/${postId}`);
  return response;
}

export async function createPost(formData) {
  const response = await axios.post(`${DUMMY_API}/posts/add`, formData, {
    headers: {
      token: localStorage.getItem("token") || "",
    },
  });
  return response;
}

export async function updatePost(postId, postData) {
  const response = await axios.put(`${DUMMY_API}/posts/${postId}`, postData, {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token") || "",
    },
  });
  return response;
}

export async function getPostComments(postId) {
  const response = await axios.get(`${DUMMY_API}/posts/${postId}/comments`);
  return response;
}

export async function addComment(postId, commentData) {
  const response = await axios.post(`${DUMMY_API}/comments/add`, {
    body: commentData.body,
    postId: postId,
    userId: commentData.userId || 1,
  });
  return response;
}

export async function deletePost(postId) {
  const response = await axios.delete(`${DUMMY_API}/posts/${postId}`);
  return response;
}

export async function deleteComment(commentId) {
  const response = await axios.delete(`${DUMMY_API}/comments/${commentId}`);
  return response;
}

export async function updateComment(commentId, body) {
  const response = await axios.put(
    `${DUMMY_API}/comments/${commentId}`,
    { body },
    { headers: { "Content-Type": "application/json" } }
  );
  return response;
}
export async function getLoggedUserData() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  // If no real token, fall back to dummy data so the app still works
  if (!token || token.startsWith("dummy-token-")) {
    return {
      data: {
        id: 1,
        username: "Asmaa Nassef",
        email: "Asmaa@example.com",
        image: "https://i.pravatar.cc/150?img=5",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
    };
  }

  const response = await axios.get(
    `${BASE_URL}/api/v1/users/getLoggedUserData`,
    {
      headers: { token },
    }
  );

  // Normalize: ensure both `image` and `avatar` are set from the response
  const user = response.data?.user || response.data;
  if (user && user.image && !user.avatar) user.avatar = user.image;
  if (user && user.avatar && !user.image) user.image = user.avatar;

  return { data: user };
}
