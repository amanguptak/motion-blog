import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';
import './topbar.css';

const socialIcons = [
  { component: FaFacebook, className: "topIcon" },
  { component: FaTwitter, className: "topIcon" },
  { component: FaInstagram, className: "topIcon" },
  { component: FaDiscord, className: "topIcon" }
];

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/write", label: "Write" }
];

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Redirect to login page upon logout
  };

  const PF = 'http://localhost:5000/images/';

  // Check if the current path is login or register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null; // Do not render the TopBar on login or register pages
  }

  return (
    <div className="top">
      <div className="topLeft">
        {socialIcons.map((icon, index) => {
          const IconComponent = icon.component;
          return <IconComponent className={icon.className} key={index} />;
        })}
      </div>
      <div className="topCenter">
        <ul className="toplist">
          {navLinks.map((link, index) => (
            <li className="topListItem" key={index}>
              <Link to={link.path} className="link">{link.label}</Link>
            </li>
          ))}
          {user && (
            <li className="topListItem">
              <button className="link" onClick={handleLogout}>LogOut</button>
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img src={PF + user.profilePic} alt="" className="topImg" />
          </Link>
        ) : (
          <ul className="toplist">
            <li className="topListItem">
              <Link className="link" to="/login">LOGIN</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">REGISTER</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
