// SinglePost.js
import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Context } from '../../context/Context';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash, FaFileImage, FaArrowLeft } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import './singlepost.css';
import CustomDialog from '../Dialog/Dialog';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  desc: z.string().min(1, 'Description is required'),
});

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [updateMode, setUpdateMode] = useState(false);
  const [file, setFile] = useState(null);
  const PF = `${import.meta.env.VITE_API_URL}/api/images/`;
  const navigate = useNavigate();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);

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
    try {
      await axios.delete(`/api/posts/${postId}`, {
        data: { username: user.username },
      });
      toast.success("Post deleted successfully");
      window.location.replace('/');
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  const handleUpdate = async (data) => {
    try {
      let updatedData = {
        username: user.username,
        title: data.title,
        desc: data.desc,
      };

      if (file) {
        const formData = new FormData();
        const filename = Date.now() + file.name;
        formData.append("name", filename);
        formData.append("file", file);
        updatedData.photo = filename;

        await axios.post("/api/upload", formData);
      }

      await axios.put(`/api/posts/${postId}`, updatedData);
      setUpdateMode(false);
      toast.success("Post updated successfully");
      setPost({ ...post, ...updatedData }); // Update the post state with new data
    } catch (err) {
      toast.error("Failed to update post");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="singlePost">
      <ToastContainer />
      {showDialog && (
        <CustomDialog 
          message="Are you sure you want to delete this post?" 
          onConfirm={handleDelete} 
          onCancel={closeDialog} 
        />
      )}
      <div className="singlePostWrapper">
        <button className="backButton" onClick={() => navigate(location.state?.from || '/')}>
          <FaArrowLeft />
        </button>
        {post.photo && !file && (
          <img src={PF + post.photo} alt={post.title} className="singlePostImg" />
        )}
        {file && (
          <div className="singlePostImgPreviewContainer">
            <img src={URL.createObjectURL(file)} alt="Image Preview" className="singlePostImgPreview" />
            <span className="singlePostImgName">{file.name}</span>
          </div>
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
            <label htmlFor="fileInput" className="fileInputLabel">
              <FaFileImage className="fileInputIcon" />
              <input 
                type="file" 
                id="fileInput"
                className="singlePostFileInput"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {file && <span className="fileName">{file.name}</span>}
            </label>
            <button type="submit" className="singlePostButton">Update</button>
          </form>
        ) : (
          <>
            <h1 className="singlePostTitle">
              {post.title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <FaEdit className="singlePostIcon" onClick={() => setUpdateMode(true)} />
                  <FaTrash className="singlePostIcon" onClick={openDialog} />
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
            <div className="singlePostDesc" dangerouslySetInnerHTML={{ __html: post.desc }}></div>
          </>
        )}
      </div>
    </div>
  );
}
