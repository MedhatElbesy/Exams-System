import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import examReducer from "./slices/examSlice";
import questionReducer from "./slices/questionSlice";
import resultsReducer from "./slices/resultSlice";

// Configure Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examReducer,
    questions: questionReducer,
    results: resultsReducer,
  },
});

export default store;
