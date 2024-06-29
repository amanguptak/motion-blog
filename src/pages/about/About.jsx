import axios from "axios";
import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaUserCircle } from 'react-icons/fa';
import "./about.css";

export default function About() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/cat");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="about">
      <div className="aboutItem">
        <h1 className="aboutTitle">About AmBlog</h1>
        <img
          src="https://cdn.kimkim.com/files/a/content_articles/featured_photos/dbd90d92461abcfcb3c34c899ec76bf102b38f07/big-dd9725aabbc0ac027cf90eb223f21db4.jpg"
          alt="About AmBlog"
          className="aboutImg"
        />
        <p>
          AmBlog is a platform created by Aman Gupta to share knowledge, insights, and stories with the world. It is a space where technology, travel, and personal development come together to inspire and inform. Whether you are looking for tips on the latest tech trends, travel guides to exotic locations, or advice on personal growth, AmBlog has something for everyone.
        </p>
        <p>
          Aman Gupta, the founder of AmBlog, is passionate about exploring new places, learning new things, and sharing his experiences. Through this blog, he aims to connect with like-minded individuals and build a community of curious and motivated readers.
        </p>
      </div>
      <div className="aboutItem">
        <h2 className="aboutSubtitle">Categories</h2>
        <ul className="aboutList">
          {cats.map((c) => (
            <li key={c._id} className="aboutListItem">{c.name}</li>
          ))}
        </ul>
      </div>
      <div className="aboutItem">
        <h2 className="aboutSubtitle">Follow Us</h2>
        <div className="aboutSocial">
          <FaFacebook className="aboutIcon" />
          <FaTwitter className="aboutIcon" />
          <FaInstagram className="aboutIcon" />
          <FaDiscord className="aboutIcon" />
          <FaUserCircle className="aboutIcon" />
        </div>
      </div>
    </div>
  );
}
