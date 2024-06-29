import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFileImage } from 'react-icons/fa';
import './write.css';

export default function Write() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [des, setDes] = useState("");
  const [categories, setCategories] = useState(""); // State for categories

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc: des,
      categories: categories.split(",").map(cat => cat.trim()), // Split and trim categories input
    };

    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("http://localhost:5000/api/upload", formData);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload image");
        return; // Exit function if upload fails
      }
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
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

      <form className="writeForm" onSubmit={handleSubmit}>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <ReactQuill
            theme="snow"
            value={des}
            onChange={setDes}
            placeholder="Tell Your Story..."
            className="writeTextEditor"
          />
        </div>

        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Categories (comma separated)"
            className="writeInput"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>

        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  );
}
