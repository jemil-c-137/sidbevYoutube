import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, logOutApi } from '../../utils/api/api';

const getUser = JSON.parse(localStorage.getItem('user'));

// check if user has token
const user = getUser && getUser.accessToken ? getUser : null;

const initialState = {
  username: user ? user.username : '',
  logging: false,
  error: false,
  errorMessage: ''
};

// thunks
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const { username, password } = userData;
    const response = await loginApi(username, password);
    console.log(response);
    return response;
  } catch (error) {
    let { response } = error;
    if (!response) {
      throw error;
    }
    return rejectWithValue(response);
  }
});

export const logOut = createAsyncThunk('auth/logOut', async () => {
  await logOutApi();
  return initialState;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  // async reducers
  extraReducers: {
    [loginUser.pending]: (state, _) => {
      debugger
      state.logging = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { data: data } = action.payload;
      debugger;
      state.username = data;
      state.logging = false;
    },
    [loginUser.rejected]: (state, action) => {
      const { payload } = action;
      state.error = true;
      debugger;
      state.errorMessage = payload.data.message;
      state.logging = false;
    },
    
    [logOut.fulfilled]: (_, __) => {
      debugger
      return { ...initialState };
    },
    
  },
})


export default authSlice.reducer