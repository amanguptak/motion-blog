import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Loader from '../../components/loader/Loader';
import './home.css';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Categories from '../../components/sidebar/Categories';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts" + search);
        setPosts(res.data);
      } catch (err) {
        toast.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="home">
        {loading ? (
          <div className="loadingSpinner"><Loader /></div>
        ) : (
          <>
            <Posts posts={posts} />
            <Categories />
          </>
        )}
      </div>
    </>
  );
}
