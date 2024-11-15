import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// Route for fetching recent posts
router.get('/recent-posts', async (req, res) => {
  try {
    // Fetch the latest 5 posts, sorted by 'createdAt' in descending order
    const posts = await Post.find().sort({ createdAt: -1 }).limit(5);
    
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    res.json(posts); // Send the posts as JSON response
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

export default router;
