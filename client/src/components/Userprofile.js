import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import axioswithtoken from './axios';
import './Userprofile.css';

function Userprofile() {
  const currentdata = useSelector(state => state.userSlice.currentdata);
  const [profiledata, setProfiledata] = useState(null);
  const [friendData, setFriendData] = useState(null);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axioswithtoken.get('http://localhost:5000/user-api/Posts');
        setProfiledata(response.data);
      } catch (error) {
        setErr(error.response?.data?.message || "An error occurred");
      }
    }

    fetchDetails();
  }, []);

  useEffect(() => {
    async function friendDetails() {
      try {
        const response = await axioswithtoken.get('http://localhost:5000/user-api/users');
        setFriendData(response.data);
      } catch (error) {
        setErr(error.response?.data?.message || "An error occurred");
      }
    }
    friendDetails();
  }, []);

  async function comments(postId) {
    navigate('/userprofile/comment', { state: { postId } });
  }

 

  async function handleClick() {
    navigate('/myprofile');
  }

  async function Addfriend(friendUsername, currentUsername) {
    try {
      
      const result = await axioswithtoken.post('http://localhost:5000/user-api/AddFriend', {
        friend: friendUsername,
        username: currentUsername,
      });
      console.log(result.data.message);
    } catch (error) {
      console.error('Error adding friend:', error.response?.data?.message || error.message);
    }
  }

  if (!profiledata && !err) {
    return <div className="alert alert-info" role="alert">Loading...</div>;
  }

  if (err) {
    return <div className="alert alert-danger" role="alert">Error: {err}</div>;
  }

  return (
    <div className="container user-profile-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="profile-header text-center">
            {currentdata && (
              <>
                <div className="profile-image">
                  {currentdata?.user?.profilePic ? (
                    <button onClick={handleClick} className="btn btn-link p-0">
                      <img
                        src={currentdata.user.profilePic}
                        alt={`${currentdata.user?.username}'s profile`}
                        className="img-fluid"
                      />
                    </button>
                  ) : (
                    <p>No profile image available</p>
                  )}
                </div>
                <h2 className="username mt-3">{currentdata?.user?.username}</h2>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          {friendData && (
            <div className="users-section">
              <h3>Users</h3>
              <div className="users-scroll-container">
                <div className="users-scroll-content">
                  {friendData.payload.map((user) => (
                    <div key={user._id} className="user-card">
                      <p className="mb-2">{user.username}</p>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => Addfriend(user?.username, currentdata?.user?.username)}
                      >
                        Add friend
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8 mx-auto">
          {profiledata && (
            <div className="posts">
              <h3>Posts</h3>
              {profiledata.payload.map((post) => (
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
      <Outlet />
    </div>
  );
}

export default Userprofile;