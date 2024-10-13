import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axioswithtoken from './axios';
import { useNavigate } from 'react-router-dom';

function Comment() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const currentdata = useSelector(state => state.userSlice.currentdata);
  const { state } = useLocation();
  const navigate=useNavigate()

  async function handleForSubmit(obj) {
    obj.username=currentdata?.user?.username
    obj._id=state?.postId
    try{
      let res = await axioswithtoken.post('http://localhost:5000/user-api/comment', obj);
      if(res.data.message==="Comment added"){
        navigate('/userprofile')
      }
      else{
        console.log("no comment is added")
      }
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleForSubmit)}>
          <label htmlFor="coment">Comment</label>
          <input
            type="text"
            id="coment"
            placeholder="Give your thoughts"
            {...register('coment', { required: 'Comment is required' })}
          />
          {errors.comment && <p className="error-message">{errors.comment.message}</p>}
          <button type="submit">Post</button>
        </form>
    </div>
  )
}

export default Comment