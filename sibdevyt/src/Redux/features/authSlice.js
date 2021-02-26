import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalStorage, loginApi, logOutApi } from '../../utils/api/api';


const initialState = {
  username: null,
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

export const getUser = createAsyncThunk('auth/getLocalStorage', async() => {
  const user = getLocalStorage()
  return user;
})

export const logOut = createAsyncThunk('auth/logOut', async () => {
  await logOutApi();
  return initialState;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  // async reducers
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      const data = action.payload;
      state.username = data.username || null;
    },
    [loginUser.pending]: (state, _) => {
      state.logging = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { data: data } = action.payload;
      state.username = data.username;
      state.logging = false;
    },
    [loginUser.rejected]: (state, action) => {
      const { payload } = action;
      state.error = true;
      state.errorMessage = payload.data.message;
      state.logging = false;
    },
    
    [logOut.fulfilled]: (_, __) => {
      return initialState;
    },
    
  },
})


export default authSlice.reducer