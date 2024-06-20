import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const createExam = createAsyncThunk(
  "exams/createExam",
  async (examData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/exams`, examData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const examSlice = createSlice({
  name: "exams",
  initialState: {
    exams: [],
    exam: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.exams.push(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default examSlice.reducer;
