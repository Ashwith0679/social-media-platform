import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './Register.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const navigate=useNavigate()

  async function handleFormSubmit(data) {
    data.posts = [];
    data.friends = [];
    const result = await axios.post('http://localhost:5000/user-api/Register',data)
    console.log(result.data.message)
    if(result.data.message==='user registered')
    {
      navigate('/Login')
    }
    else{
      setErr(result.data.message)
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            id="user" 
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            id="password" 
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            id="email" 
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Profile URL</label>
          <input 
            type="url" 
            id="profilePic" 
            {...register('profilePic', { required: 'Profile URL is required' })} 
          />
          {errors.profilePic && <span className="error-message">{errors.profilePic.message}</span>}
        </div>
        <div className="form-group">
          <label>bio</label>
          <input 
            type="text" 
            id="bio" 
            {...register('bio', { required: 'bio is required' })}
          />
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
