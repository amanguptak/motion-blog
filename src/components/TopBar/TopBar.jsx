import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import { FaBars, FaTimes } from 'react-icons/fa';
import './topbar.css';

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
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Redirect to login page upon logout
  };
 
  const PF = `${import.meta.env.VITE_API_URL}/api/images/`;

  // Check if the current path is login or register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null; // Do not render the TopBar on login or register pages
  }

  return (
    <div className="top">
      <div className="topLeft">
        <h3><Link to="/">motionBlog</Link></h3>
      </div>
      <div className="topCenter">
        <ul className="toplist">
          {navLinks.map((link, index) => (
            <li className="topListItem" key={index}>
              <Link to={link.path} className="link">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <div className='user-options'>
            <Link to="/settings">
              <img src={PF + user.profilePic} alt="" className="topImg" />
            </Link>
            <button className="link" onClick={handleLogout}>LogOut</button>
          </div>
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
      <div className="burgerIcon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
       
        <ul className="sidebarList">
          {navLinks.map((link, index) => (
            <li className="sidebarListItem" key={index}>
              <Link to={link.path} className="link" onClick={() => setIsOpen(false)}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
