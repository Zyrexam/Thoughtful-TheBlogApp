import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PostPage.css'
const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${id}`);
                if (!response.ok) throw new Error("Post not found");

                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p>Loading post...</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div className="post-page-container">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-author">By {post.authorId?.username}</p>
            <p className="post-content">{post.content}</p>
            <p className="post-date">
                <small>Published on: {new Date(post.createdAt).toLocaleDateString()}</small>
            </p>
        </div>
    );
};

export default PostPage;
