import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import "./post.css";

export default function Post({ post }) {
  
  const PF = `${import.meta.env.VITE_API_URL}/api/images/`
  
  console.log(post,"checking post")
  const maxDescLength = 100;
  const isDescLong = post.desc.split(" ").length > maxDescLength;
  const trimmedDesc = isDescLong
    ? post.desc.split(" ").slice(0, maxDescLength).join(" ") + "..."
    : post.desc;

  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={`${PF}${post.photo}`} alt={post.title} />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post?.categories?.map((c, index) => (
            <span key={index} className="postCat">
              {c}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <div className="postDescWrapper">
        <p
          className="postDesc"
          dangerouslySetInnerHTML={{ __html: trimmedDesc }}
        ></p>
        {isDescLong && (
          <Link to={`/post/${post._id}`} className="readMore">
            Read More <FaArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    photo: PropTypes.string,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
