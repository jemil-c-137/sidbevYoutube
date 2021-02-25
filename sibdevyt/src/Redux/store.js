import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';

import mainReducer from './mainReducer';

const rootReducer = combineReducers({
  root: mainReducer,
  auth: authSlice,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
