import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./register.css";

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/register", data);
      if (res.data) {
        toast.success("Registration successful!");
        navigate('/login');
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="register">
      <ToastContainer />
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..."
          {...register('username')} />
        {errors.username && <span className="errorMessage">{errors.username.message}</span>}
        
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..."
          {...register('email')} />
        {errors.email && <span className="errorMessage">{errors.email.message}</span>}
        
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..."
          {...register('password')} />
        {errors.password && <span className="errorMessage">{errors.password.message}</span>}
        
        <button className="registerButton" type="submit">Register</button>
      </form>
      <button className="loginButton"><Link to='/login' className="link">Login</Link></button>
    </div>
  );
}
