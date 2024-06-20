import { configureStore } from "@reduxjs/toolkit";
import examReducer from "./slices/examSlice";
import authReducer from "./slices/authSlice";


// Configure Redux store
const store = configureStore({
  reducer: {
    exams: examReducer,
    auth: authReducer,
  },
});

export default store;
