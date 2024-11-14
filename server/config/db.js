const mongoose = require("mongoose");
const User = require("./models/user");
const insertPost = require("./insertPost");

// MongoDB connection URI
const uri = "mongodb://localhost:27017/blogdb";

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error so it can be handled elsewhere
  }
}

// Close MongoDB connection
async function closeDB() {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
}

// Get User ID by email
async function getUserIdByEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }
    return user._id;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

// Main function to insert a post
async function createPost() {
  try {
    const title = "Benefits of Mindfulness and Meditation in Everyday Life";
    const content = "In a world where stress and distractions are common, mindfulness and meditation have become invaluable tools for improving mental well-being and quality of life. These practices are rooted in ancient traditions but are increasingly supported by modern science, offering profound benefits for the mind and body. Here’s an in-depth look at the everyday benefits of mindfulness and meditation and how they can transform your life.";

    // Fetch user ID by email
    const authorId = await getUserIdByEmail("hritinraj.12a.24@gmail.com");

    // Insert post
    await insertPost(title, content, authorId);

    // Optionally close the DB connection if no more operations are needed
    await closeDB();
  } catch (error) {
    console.error("Error creating post:", error);
    await closeDB(); // Ensure the DB is closed even if there’s an error
  }
}

// Export functions for use in other files
module.exports = {
  connectDB,
  closeDB,
  createPost,
  getUserIdByEmail,
};

// Call the function to create a post if this script is being run directly
if (require.main === module) {
  (async () => {
    await connectDB();
    await createPost();
  })();
}
