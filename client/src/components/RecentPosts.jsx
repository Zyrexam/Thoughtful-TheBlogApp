function RecentPosts() {
  const posts = [
    { id: '1', title: 'Recent Post 1' },
    { id: '2', title: 'Recent Post 2' },
    { id: '3', title: 'Recent Post 3' },
  ];

  return (
    <div className="recent-posts">
      <h2 className="recent-posts-title">Recent Posts</h2>
      <ul className="recent-posts-list">
        {posts.map((post, index) => (
          <li key={index} className="recent-post-item">
            <a href={`/post/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentPosts;
