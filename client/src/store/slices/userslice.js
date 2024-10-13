import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to handle user login
export const userLogin = createAsyncThunk('userlogin', async (userObj, thunkAPI) => {
  try {
    const res = await axios.post('http://localhost:5000/user-api/Login', userObj);
    if (res.data.message === 'user logged in') {
      // Store token in local storage
      localStorage.setItem('token', res.data.token);
      // Return the data
      return res.data;
    } else {
      return thunkAPI.rejectWithValue(res.data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

// Get token from localStorage
const token = localStorage.getItem('token');

// Slice to handle user state
export const userslice = createSlice({
  name: 'user-info',
  initialState: {
    iPending: false,
    userlogin: !!token, // Set userlogin to true if a token is found
    errOccurence: false,
    currentdata: token ? { token } : {}, // Store token in currentdata if available
    errMsg: '',
  },
  reducers: {
    resetState: (state) => {
      state.iPending = false;
      state.userlogin = false;
      state.currentdata = {};
      state.errMsg = '';
      state.errOccurence = false;
      // Remove token from localStorage
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.iPending = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.iPending = false;
        state.currentdata = action.payload;
        state.userlogin = true;
        state.errMsg = '';
        state.errOccurence = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.iPending = false;
        state.currentdata = {};
        state.userlogin = false;
        state.errMsg = action.payload;
        state.errOccurence = true;
      });
  },
});

// Export action creators and reducers
export const { resetState } = userslice.actions;
export default userslice.reducer;
