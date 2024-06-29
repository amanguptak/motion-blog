import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerTitle">
          <span className="title">AmanBlog</span>
          <span className="slogan">Your daily dose of amazing stories</span>
        </div>
        <img 
          src="https://yakult.com.mt/wp-content/uploads//2017/01/GIAPPONE1400X600.jpg" 
          alt="Header Background" 
          className="headerImg" 
        />
      </div>
    </div>
  );
}
