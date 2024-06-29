import PropTypes from 'prop-types';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts?.map((p) => (
        <motion.div
          key={p._id}
          initial={{ opacity: 0, y: 20 }} // Initial animation states
          animate={{ opacity: 1, y: 0 }} // Animation states when component mounts
          transition={{ duration: 0.5 }} // Animation transition duration
          whileHover={{ scale: 1.05 }} // Animation effect on hover
          whileTap={{ scale: 0.95 }} // Animation effect on tap
        >
          <Post post={p} />
        </motion.div>
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
