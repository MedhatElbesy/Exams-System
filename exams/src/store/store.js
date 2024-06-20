import { configureStore } from "@reduxjs/toolkit";
import examReducer from "./slices/examSlice";
import authReducer from "./slices/authSlice";
import resultsReducer from "./slices/resultSlice";

// Configure Redux store
const store = configureStore({
  reducer: {
    exams: examReducer,
    auth: authReducer,
    results: resultsReducer,
  },
});

export default store;
