import React from 'react';
import { Link } from 'react-router-dom';
import './CreatePostButton.css'; 

function CreatePostButton() {
  return (
    <div className="create-post-button-container">
      <Link to="/create-post" className="create-post-button">
        <i className="fas fa-plus create-post-icon"></i>
        Create Post
      </Link>
    </div>
  );
}

export default CreatePostButton;
