import PropTypes from 'prop-types';
import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts?.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </div>
  );
}

// Define propTypes for Posts
Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
