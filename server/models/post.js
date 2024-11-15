
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});




postSchema.pre("save", async function (next) {
    const post = this;
    if (!post.postId) {
        try {
            const count = await mongoose.model("posts").countDocuments();
            post.postId = count + 1;
            console.log("Assigned postId:", post.postId); // Log the postId being assigned
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        next();
    }
  });
  



const Post = mongoose.model("posts", postSchema);

export default Post;
