import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Context } from '../../context/Context';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import './singlepost.css';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  desc: z.string().min(1, 'Description is required'),
});

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [updateMode, setUpdateMode] = useState(false);
const PF = `${import.meta.env.VITE_API_URL}/api/images/`

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
        setValue('title', res.data.title);
        setValue('desc', res.data.desc);
      } catch (err) {
        toast.error("Failed to fetch post data");
      }
    };
    getPost();
  }, [postId, setValue]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/api/posts/${postId}`, {
          data: { username: user.username },
        });
        toast.success("Post deleted successfully");
        window.location.replace('/');
      } catch (err) {
        toast.error("Failed to delete post");
      }
    }
  };

  const handleUpdate = async (data) => {
    try {
      await axios.put(`/api/posts/${postId}`, {
        username: user.username,
        title: data.title,
        desc: data.desc,
      });
      setUpdateMode(false);
      toast.success("Post updated successfully");
    } catch (err) {
      toast.error("Failed to update post");
    }
  };

  return (
    <div className="singlePost">
      <ToastContainer />
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt={post.title} className="singlePostImg" />
        )}
        {updateMode ? (
          <form onSubmit={handleSubmit(handleUpdate)} className="singlePostForm">
            <input
              type="text"
              {...register('title')}
              className="singlePostTitleInput"
              autoFocus
            />
            {errors.title && <span className="errorMessage">{errors.title.message}</span>}
            <ReactQuill
              theme="snow"
              value={post.desc}
              onChange={(content) => setValue('desc', content)}
              className="singlePostDescInput"
            />
            {errors.desc && <span className="errorMessage">{errors.desc.message}</span>}
            <button type="submit" className="singlePostButton">Update</button>
          </form>
        ) : (
          <>
            <h1 className="singlePostTitle">
              {post.title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <FaEdit className="singlePostIcon" onClick={() => setUpdateMode(true)} />
                  <FaTrash className="singlePostIcon" onClick={handleDelete} />
                </div>
              )}
            </h1>
            <div className="singlePostInfo">
              <span className="singlePostAuthor">
                Author:
                <Link to={`/?user=${post.username}`} className="link">
                  <b> {post.username}</b>
                </Link>
              </span>
              <span className="singlePostDate">
                {new Date(post.createdAt).toDateString()}
              </span>
            </div>
            <p className="singlePostDesc" dangerouslySetInnerHTML={{ __html: post.desc }}></p>
          </>
        )}
      </div>
    </div>
  );
}
