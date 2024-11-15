import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function PostSlider() {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   async function fetchPosts() {
  //     try {
  //       const response = await fetch("/api/recent-posts");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch posts");
  //       }
  //       const postsData = await response.json();
  //       setPosts(postsData);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   }
  //   fetchPosts();
  // }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/recent-posts');
      
      // Check if response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Fetched Posts Data:', data); // Log the JSON data to inspect it
  
      setPosts(data); // Assuming `setPosts` is used to update the state with fetched posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
  };

  return (
    <div className="post-slider">
      <h2 className="slider-title">Trending Posts</h2>
      <Slider {...settings}>
        {posts.map((post) => (
          <div key={post._id} className="slider-item">
            <div className="slider-post">
              <div className="slider-post-title">
                <a href={`/post/${post._id}`}>{post.title}</a>
              </div>
              <div className="slider-post-info">
                <div className="slider-post-author">
                  <i className="fas fa-user"></i>
                  <span>{post.authorId || "Unknown Author"}</span> 
                </div>
                <div className="slider-post-date">
                  <i className="fas fa-calendar-day"></i>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );

 
  

}


export default PostSlider;
