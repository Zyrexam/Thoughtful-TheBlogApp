import React, { useState } from "react";
import "./CreatePostForm.css";  // Import the custom CSS for CreatePostForm

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { title, content, username, email };

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        // Optionally reset the form
        setTitle("");
        setContent("");
        setUsername("");
        setEmail("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-input"
        ></textarea>
      </div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">Create Post</button>
    </form>
  );
}

export default CreatePostForm;
