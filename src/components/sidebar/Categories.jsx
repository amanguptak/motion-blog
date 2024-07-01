import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTwitter, FaInstagram, FaDiscord, FaUserCircle } from 'react-icons/fa';
import "./categories.css";

export default function Categories() {
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  const handleCategoryClick = (catName) => {
    navigate(`/?cat=${catName}`);
    if (window.innerWidth < 768) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="categories">
      <div className="intro">
        <h2 className="catTitle">Welcome to Our Blog</h2>
        <p className="description">Discover amazing content on various topics. Explore categories, follow us, and stay updated!</p>
      </div>

      <div className="categoriesListContainer">
        <h3 className="sectionTitle">Categories</h3>
        <ul className="categoriesList">
          {cats?.map((c) => (
            <li
              key={c._id}
              className="categoriesListItem"
              onClick={() => handleCategoryClick(c.name)}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="socialMedia">
        <h3 className="sectionTitle">Follow Us</h3>
        <div className="socialIcons">
          <FaTwitter className="icon" />
          <FaInstagram className="icon" />
          <FaDiscord className="icon" />
          <Link to="https://amangupta.site"><FaUserCircle className="icon" /></Link>
        </div>
      </div>
    </div>
  );
}
