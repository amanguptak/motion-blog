import "./setting.css";
import Sidebar from "../../components/sidebar/Categories";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Settings() {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const PF = `${import.meta.env.VITE_API_URL}/api/images/`;
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('email', user.email);
    }
  }, [setValue, user]);

  const onSubmit = async (data) => {
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/api/upload", formData);
      } catch (err) {
        toast.error("Failed to upload image");
      }
    }
    try {
      const res = await axios.put(`/api/users/${user._id}`, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      toast.success("Profile has been updated");
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      toast.error("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`/api/users/${user._id}`, { data: { userId: user._id } });
        dispatch({ type: "LOGOUT" });
        toast.success("Account has been deleted");
        window.location.replace("/");
      } catch (err) {
        toast.error("Failed to delete account");
      }
    }
  };

  return (
    <div className="settings">
      <ToastContainer />
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <button className="settingsDeleteTitle" onClick={handleDelete}>
            <FaTrash /> Delete Account
          </button>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit(onSubmit)}>
          <label className="settingLabel">Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" className="settingsPPImg" />
            <label htmlFor="fileInput" className="settingsPPIcon">
              <FaEdit />
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <label className="settingLabel">Username</label>
          <input className="settingsInput" type="text" {...register('username')} />
          {errors.username && <span className="errorMessage">{errors.username.message}</span>}
          
          <label className="settingLabel">Email</label>
          <input className="settingsInput" type="email" {...register('email')} />
          {errors.email && <span className="errorMessage">{errors.email.message}</span>}
          
          <label className="settingLabel">Password</label>
          <input className="settingsInput" type="password" placeholder="Enter new password" {...register('password')} />
          {errors.password && <span className="errorMessage">{errors.password.message}</span>}
          
          <button className="settingsSubmitButton" type="submit">Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
