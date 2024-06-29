import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaUserCircle } from 'react-icons/fa';
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/cat");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About ME</span>
        <img
          src="https://cdn.kimkim.com/files/a/content_articles/featured_photos/dbd90d92461abcfcb3c34c899ec76bf102b38f07/big-dd9725aabbc0ac027cf90eb223f21db4.jpg"
          alt="About me"
          className="sidebarImg"
        />
        <p>
          Knowledge and awareness are vague, and perhaps better called illusions. Everyone lives within their own subjective interpretation.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c?.name}`} key={c._id} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <FaFacebook className="sidebarIcon" />
          <FaTwitter className="sidebarIcon" />
          <FaInstagram className="sidebarIcon" />
          <FaDiscord className="sidebarIcon" />
          <FaUserCircle className="sidebarIcon" />
        </div>
      </div>
    </div>
  );
}
