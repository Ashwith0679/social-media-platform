import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axioswithtoken from './axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Myprofile() {

    const currentdata = useSelector(state => state.userSlice.currentdata);
    const [Myprofile,setMyprofile]=useState()
    const [err, setErr] = useState(null);
    const navigate=useNavigate()

    async function createPost(){
        navigate('/Addpost')
    }

    useEffect(()=>{
        async function userPosts()
        {
            try{
                const res=await axioswithtoken.get(`http://localhost:5000/user-api/Posts/${currentdata?.user?.username}`)
                setMyprofile(res.data)
            }   
            catch(error){
                setErr(error.response?.data?.message || "An error occurred");
            } 

        }

        userPosts()
    })
    
    async function comments(postId) {
        navigate('/Myprofile/comment', { state: { postId } });
    }
  return (
    <div>
         {currentdata && (
        <>
          <div className="profile-image">
            {currentdata?.user?.profilePic ? (
              <img 
                src={currentdata.user.profilePic} 
                alt={`${currentdata.user?.username}'s profile`}
              />
            ) : (
              <p>No profile image available</p>
            )}
          </div>
          <h4 className="modda">{currentdata?.user?.username}</h4>
        </>
      )}
      <div>
        <h4>Friends</h4>
        <h6>{currentdata?.user?.friends?.length}</h6>
      </div>
      <div>
        <button onClick={createPost}>Add Post</button>
      </div>
      <div>
      {Myprofile && (
            <div className="posts">
              <h3>Posts</h3>
              {Myprofile.payload.map((post) => (
                <div key={post._id} className="card mb-3">
                  <img
                    src={post.post}
                    className="card-img-top"
                    alt={`Post by ${post?.username}`}
                    onError={(event) => {
                      event.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <div className="card-body">
                    <p className="card-text">Username: {post.username}</p>
                    <button className="btn btn-secondary btn-sm" onClick={() => comments(post._id)}>
                      Comment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default Myprofile