import express from "express";
import mongoose from "mongoose";
import Post from "./models/post.js";
import User from "./models/user.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Get __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Connect to MongoDB
const uri = "mongodb://localhost:27017/blogdb";
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error:", error));

// Middleware
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

// Routes
app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Fetch recent posts
app.get("/api/recent-posts", async (req, res) => {
  try {
    const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentPosts);
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    res.status(500).json({ message: "Error fetching recent posts" });
  }
});

// Fetch a specific post by ID
app.get("/api/posts/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId); // Using findById for consistency
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Fetch posts with populated author details
app.get("/api/details", async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId", "username");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching post details:", error);
    res.status(500).json({ message: "Error fetching post details" });
  }
});

// Create a new post, with new user if necessary
app.post("/api/create", async (req, res) => {
  const { title, content, username, email } = req.body;

  try {
    // Check if the user exists in the database
    let user = await User.findOne({ email: email });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({ username, email });
      await user.save();
    }

    // Create post for user
    const newPost = new Post({
      title,
      content,
      authorId: user._id,
    });
    await newPost.save();

    res.json({ success: true, message: "User and post created successfully." });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
});

// Fetch post by title
app.get("/api/posts/title/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const post = await Post.findOne({ title });
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by title:", error);
    res.status(500).json({ message: "Error fetching post by title" });
  }
});

// Fetch posts by author email
app.get("/api/posts/author/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error("Author not found");
      return res.status(404).json({ message: "Author Not Found" });
    }

    const posts = await Post.find({ authorId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    res.status(500).json({ message: "Error fetching posts by author" });
  }
});
