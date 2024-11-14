import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import '../ProfilePage.css';  // Import the custom CSS file for ProfilePage

const ProfilePage = () => {
    const { id } = useParams(); // Get user ID from the URL parameters
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await fetch(`/api/users/${id}`);
                const postsResponse = await fetch(`/api/posts?author=${id}`);
                
                if (!userResponse.ok || !postsResponse.ok) throw new Error("User or posts not found");

                const userData = await userResponse.json();
                const postsData = await postsResponse.json();

                setUser(userData);
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    if (loading) return <p>Loading profile...</p>;
    if (!user) return <p>User not found.</p>;

    return (
        <div className="profile-page">
            <NavBar />
            
            <header className="profile-header">
                <h1 className="profile-title">{user.username}</h1>
                <p className="profile-email">{user.email}</p>
            </header>

            <main className="profile-posts">
                <h2 className="profile-posts-title">My Posts</h2>
                {posts.length === 0 ? (
                    <p>No posts yet.</p>
                ) : (
                    <ul>
                        {posts.map(post => (
                            <li key={post._id} className="profile-post-item">
                                <a href={`/post/${post._id}`} className="profile-post-link">
                                    {post.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default ProfilePage;
