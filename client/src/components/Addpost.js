import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axioswithtoken from './axios';
import './Addpost.css';
import { useNavigate } from 'react-router-dom';

function Addpost() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const currentdata = useSelector(state => state.userSlice.currentdata);
  const navigate = useNavigate();

  // Example friends data (replace with actual)
  const friends = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4'];

  async function handleFormSubmit(Obj) {
    Obj.username = currentdata?.user?.username;
    Obj.coments = [];
    let res = await axioswithtoken.post('http://localhost:5000/user-api/AddPost', Obj);
    if(res.data.message === "post has created"){
        navigate('/myprofile');
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form className="card p-4 shadow-sm" onSubmit={handleSubmit(handleFormSubmit)}>
            
            {/* Post URL Field */}
            <div className="form-group mb-3">
              <label htmlFor="profilePic" className="form-label">Post URL</label>
              <input 
                type="url" 
                id="profilePic" 
                className={`form-control ${errors.profilePic ? 'is-invalid' : ''}`} 
                {...register('profilePic', { required: 'Profile URL is required' })} 
              />
              {errors.profilePic && <div className="invalid-feedback">{errors.profilePic.message}</div>}
            </div>

            {/* Friends Section */}
            <div className="mb-3">
              <label className="form-label">Tag Friends</label>
              <div className="d-flex flex-wrap">
                {friends.map((friend, index) => (
                  <span key={index} className="badge bg-secondary me-2 mb-2">{friend}</span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">Add Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addpost;
