import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Context } from '../../context/Context';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFileImage } from 'react-icons/fa';
import './write.css';

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  categories: z.string().min(1, "Categories are required")
});

export default function Write() {
  const { user } = useContext(Context);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const newPost = {
      username: user.username,
      title: data.title,
      desc: data.desc,
      categories: data.categories.split(",").map(cat => cat.trim())
    };

    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("/api/upload", formData);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload image");
        return; // Exit function if upload fails
      }
    }

    try {
      const res = await axios.post("/api/posts", newPost);
      toast.success("Post published successfully");
      console.log(res.data); // Log response data if needed
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.error("Error publishing post:", error);
      toast.error("Failed to publish post");
    }
  };

  return (
    <div className="write">
      <ToastContainer />
      {file && <img src={URL.createObjectURL(file)} className="writeImg" alt="Preview" />}

      <form className="writeForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <FaFileImage className="fileIcon" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            {...register("title")}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div className="writeFormGroup">
          <ReactQuill
            theme="snow"
            onChange={(value) => setValue("desc", value)}
            placeholder="Tell Your Story..."
            className="writeTextEditor"
          />
          {errors.desc && <p className="error">{errors.desc.message}</p>}
        </div>

        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Categories (comma separated)"
            className="writeInput"
            {...register("categories")}
          />
          {errors.categories && <p className="error">{errors.categories.message}</p>}
        </div>

        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  );
}
