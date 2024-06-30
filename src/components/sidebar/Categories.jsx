import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaUserCircle } from 'react-icons/fa';
import "./categories.css";

export default function Categories() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="categories">
      <div className="intro">
        <h2 className="title">Welcome to Our Blog</h2>
        <p className="description">Discover amazing content on various topics. Explore categories, follow us, and stay updated!</p>
      </div>

      <div className="categoriesListContainer">
        <h3 className="sectionTitle">Categories</h3>
        <ul className="categoriesList">
          {cats.map((c) => (
            <Link to={`/?cat=${c?.name}`} key={c._id} className="link">
              <li className="categoriesListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="socialMedia">
        <h3 className="sectionTitle">Follow Us</h3>
        <div className="socialIcons">
          <FaFacebook className="icon" />
          <FaTwitter className="icon" />
          <FaInstagram className="icon" />
          <FaDiscord className="icon" />
          <FaUserCircle className="icon" />
        </div>
      </div>
    </div>
  );
}
