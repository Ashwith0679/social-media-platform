import axios from 'axios';

const token = localStorage.getItem('token');

const axioswithtoken = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export default axioswithtoken;