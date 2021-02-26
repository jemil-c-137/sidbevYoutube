import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { youtubeAPI, addRequestToLocalStorage, changeLocalStorageFavs } from './../utils/api/api';
import { logOut } from './features/authSlice';


const initialState = {
  /*
  userData: user
    ? {
        logging: false,
        username: user.username,
      }
    : {
        logging: false,
        username: '',
      },
      */
  videos: [],
  currentRequest: {
    request: '',
    sortBy: '',
    name: '',
    maxResults: '',
  },
  totalResults: 0,
  loading: false,
  favoriteRequests: [],
  /*
  error: false,
  errorMessage: ''
  */
};
export const fetchVideos = createAsyncThunk('items/fetchVideos', async (requestName, number) => {
  const preparedRequest = requestName.split(' ').join('+');
  const res = await youtubeAPI.search(preparedRequest).then((response) => response.data);
  return { data: res, requestName };
});

export const favoriteRequestFetch = createAsyncThunk(
  'items/favoriteRequestFetch',
  async ({ request, sortBy, maxResults }) => {
    const preparedRequest = request.split(' ').join('+');
    const res = await youtubeAPI.customSearch(preparedRequest, sortBy, maxResults).then((response) => response.data);
    return { data: res, request };
  }
);
/*
export const loginUser = createAsyncThunk('items/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const { username, password } = userData;
    const response = await loginApi(username, password);
    console.log(response);
    debugger;
    return response;
  } catch (error) {
    let { response } = error;
    if (!response) {
      throw error;
    }
    debugger;
    return rejectWithValue(response);
  }
});

export const logOut = createAsyncThunk('items/logOut', async () => {
  await logOutApi();
  return initialState;
});
*/
let nextRequestId = 0;

const videosSlice = createSlice({
  name: 'items',
  initialState: initialState,
  reducers: {
    addFavRequest: {
      reducer(state, action) {
        state.favoriteRequests.push(action.payload);
        addRequestToLocalStorage(action.payload);
        state.currentRequest = action.payload;
      },
      prepare({ request, maxResults, name, sortBy }) {
        return { payload: { request, maxResults, name, sortBy, id: nextRequestId++, isFav: true } };
      },
    },
    setCurrentRequest(state, action) {
      const { request, sortBy, name, maxResults, id } = action.payload;
      state.currentRequest.request = request;
      state.currentRequest.sortBy = sortBy;
      state.currentRequest.name = name;
      state.currentRequest.maxResults = maxResults;
      state.currentRequest.id = id;
    },
    clearCurrentRequest(state, action) {
      state.currentRequest = {};
    },
    clearVideos(state, action) {
      state.videos = [];
      state.currentRequest = { request: '', sortBy: '', name: '', maxResults: '' };
      state.totalResults = 0;
    },
    updateFavRequest(state, action) {
      const { request, sortBy, name, maxResults, id } = action.payload;
      const requestToEdit = state.favoriteRequests.find((req) => req.id === id);
      requestToEdit.request = request;
      requestToEdit.sortBy = sortBy;
      requestToEdit.name = name;
      requestToEdit.maxResults = maxResults;
      changeLocalStorageFavs(state.favoriteRequests);
    },
    deleteFavRequest(state, action) {
      const { id } = action.payload;
      const filteredFavs = state.favoriteRequests.filter((request) => request.id !== id);
      state.favoriteRequests = filteredFavs;
      changeLocalStorageFavs(filteredFavs);
    },
  },
  // async reducers
  extraReducers: {
    [fetchVideos.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchVideos.fulfilled]: (state, action) => {
      const { data, requestName } = action.payload;
      state.videos = data.items;
      state.totalResults = data.pageInfo.totalResults;
      state.loading = false;
      state.currentRequest.request = requestName;
    },
    [favoriteRequestFetch.pending]: (state, action) => {
      state.loading = true;
    },
    [favoriteRequestFetch.fulfilled]: (state, action) => {
      const { data, request } = action.payload;
      state.videos = data.items;
      state.requestName = request;
      state.totalResults = data.pageInfo.totalResults;
      state.loading = false;
    },
    /*
    [loginUser.pending]: (state, action) => {
      state.userData.logging = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { data: data } = action.payload;
      debugger;
      state.userData.username = data;
      state.userData.logging = false;
    },
    [loginUser.rejected]: (state, action) => {
      const { payload } = action;
      state.error = true;
      state.errorMessage = payload.data.message;
      state.userData.logging = false;
    },
    */
    [logOut.fulfilled]: (state, action) => {
      return { ...initialState, favoriteRequests: [] };
    },
    
  },
});

export const {
  addVideos,
  addFavRequest,
  setCurrentRequest,
  clearCurrentRequest,
  updateFavRequest,
  clearVideos,
  deleteFavRequest,
} = videosSlice.actions;
export default videosSlice.reducer;
