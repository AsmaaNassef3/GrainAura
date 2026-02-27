import axios from "axios";

const DUMMY_API = "https://dummyjson.com";

export async function getAllPosts() {
  const response = await axios.get(`${DUMMY_API}/posts?`, {
    params: {
      limit: 15,
      skip: 0,
      select: "title,body,userId",
      sort:'-createdAt'
    }
  });
  return response;
}

export async function getSinglePost(postId) {
  const response = await axios.get(`${DUMMY_API}/posts/${postId}`);
  return response;
}

export async function createPost(formData) {
  const response = await axios.post(`${DUMMY_API}/posts/add`, formData,{
    headers: {
    
      'token': localStorage.getItem("token") || "",
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









