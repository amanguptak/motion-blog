import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Context } from '../../context/Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaImage } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './write.css';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  file: z.custom((value) => value instanceof File && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type), {
    message: "Image is required for blog post",
  }),
  desc: z.string().min(1, 'Description is required'),
  categories: z.string().optional(),
});

export default function Write() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!file) {
      toast.error("Image is required for blog post");
      return;
    }
    
    setLoading(true);
    const newPost = {
      username: user.username,
      title: data.title,
      desc: data.desc,
      categories: data.categories ? data.categories.split(',').map(cat => cat.trim()) : [],
    };

    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", formData);
      } catch (err) {
        toast.error("File upload failed");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
      toast.success("Post published successfully");
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      toast.error("Failed to publish post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="write">
      <ToastContainer />
      {loading && <div className="loadingSpinner">Loading...</div>}
      <form className="writeForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <FaImage className="fileIcon" />
          </label>
          <input 
            type="file" 
            id="fileInput" 
            style={{ display: "none" }} 
            accept="image/*"
            {...register('file')}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {errors.file && <span className="errorMessage">{errors.file.message}</span>}
          <input 
            type="text" 
            placeholder="Title" 
            className="writeInput" 
            autoFocus={true} 
            {...register('title')}
          />
          {errors.title && <span className="errorMessage">{errors.title.message}</span>}
        </div>
        {file && (
          <div className="writeFormGroup">
            <img src={URL.createObjectURL(file)} className="writeImg" alt="" />
          </div>
        )}
        <div className="writeFormGroup">
          <ReactQuill
            theme="snow"
            placeholder="Tell your story..."
            onChange={(content) => setValue('desc', content)}
            className="writeTextEditor"
          />
          {errors.desc && <span className="errorMessage">{errors.desc.message}</span>}
        </div>
        <div className="writeFormGroup">
          <input 
            type="text" 
            placeholder="Categories (comma separated)" 
            className="writeInput" 
            {...register('categories')}
          />
        </div>
        <button className="writeSubmit" type="submit" disabled={loading}>Publish</button>
      </form>
    </div>
  );
}
