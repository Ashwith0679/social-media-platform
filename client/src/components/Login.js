import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../store/slices/userslice';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [FormSubmit, setFormSubmit] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userlogin, errOccurence, errMsg } = useSelector(state => state.userSlice);

  function handleForSubmit(formObj) {
    setFormSubmit(formObj);
    dispatch(userLogin(formObj));
  }

  // Navigate if the user is logged in (token exists)
  useEffect(() => {
    if (userlogin) {
      navigate('/userprofile');
    }
  }, [userlogin, navigate]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(handleForSubmit)} className="login-form">
        <h2 className="form-title">Login</h2>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        {errOccurence && <p className="error-message">{errMsg}</p>}

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
