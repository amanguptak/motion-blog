import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export default function Login() {
  const [flag, setFlag] = useState(false);
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      toast.success('Login successful!');
      navigate('/');  // Redirect to home on successful login
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
      toast.error(`Login failed: ${err.response?.data?.message || 'Unknown error'}`);
      setFlag(true);
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="loginContainer">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <input 
            type="text" 
            className="loginInput" 
            placeholder="Enter your username"
            {...register('username')}
          />
          {errors.username && <span className="errorMessage">{errors.username.message}</span>}
          
          <label>Password</label>
          <input 
            type="password" 
            className="loginInput" 
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password && <span className="errorMessage">{errors.password.message}</span>}
          
          <button className="loginBtn" type="submit" disabled={isFetching}>Login</button>
          {flag && <span className="errorMessage">Invalid Data</span>}
        </form>
        
        <Link to='/register' className="registerLink">Register</Link>
      </div>
    </div>
  );
}
