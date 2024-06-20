import { configureStore } from "@reduxjs/toolkit";
import examReducer from "./slices/examSlice";


// Configure Redux store
const store = configureStore({
  reducer: {
    exams: examReducer,

  },
});

export default store;
