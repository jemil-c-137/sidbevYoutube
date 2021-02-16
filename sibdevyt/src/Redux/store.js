import { configureStore, combineReducers } from '@reduxjs/toolkit'

import mainReducer from "./mainReducer";


const rootReducer = combineReducers({
  root: mainReducer,
})
const store = configureStore({
  reducer: rootReducer,
})
export default store;