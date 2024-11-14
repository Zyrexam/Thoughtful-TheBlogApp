import React from 'react';
import PostSlider from '../components/PostSlider';
import RecentPosts from '../components/RecentPosts';
import CreatePostButton from '../components/CreatePostButton';
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">ThoughtFULL</h1>
      </header>
      
      <main>
        <PostSlider />
        <RecentPosts />
      </main>

      <CreatePostButton />
    </div>
  );
}

export default HomePage;

