const Post = require("./models/post")


export async function insertPost(title, content, authorId) {
    const post = new Post({
      title: title,
      content: content,
      authorId: authorId
    });
  
    const savedPost = await post.save();
    console.log("Post Saved:", savedPost);
  }
  


