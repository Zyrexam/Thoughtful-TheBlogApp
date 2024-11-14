import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const postData = await response.json();
        setPost(postData[0]); // Assume postData is an array
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Author: {post.username}</p>
      <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default PostPage;
