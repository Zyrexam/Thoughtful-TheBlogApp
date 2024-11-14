function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-image"></div>
      <h3 className="post-title"><a href={`/post/${post.id}`}>{post.title}</a></h3>
      <div className="post-meta">
        <div className="post-author">
          <i className="fa-solid fa-user"></i>
          <span>{post.username}</span>
        </div>
        <div className="post-date">
          <i className="fa-solid fa-calendar-days"></i>
          <span>{post.date}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
