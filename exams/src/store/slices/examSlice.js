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

export const fetchExams = createAsyncThunk(
  "exams/fetchExams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/exams`, {
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

export const fetchExamById = createAsyncThunk(
  "exams/fetchExamById",
  async (examId) => {
    try {
      const response = await axios.get(`${baseURL}/exams/${examId}`);
      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message ||
          `Failed to fetch exam with ID ${examId}`
      );
    }
  }
);

export const updateExam = createAsyncThunk(
  "exams/updateExam",
  async ({ examId, examData }) => {
    try {
      const response = await axios.put(`${baseURL}/exams/${examId}`, examData);
      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message ||
          `Failed to update exam with ID ${examId}`
      );
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
      .addCase(fetchExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.exam = action.payload;
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
      })
      .addCase(updateExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.exams = state.exams.map((exam) =>
          exam._id === action.payload._id ? action.payload : exam
        );
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default examSlice.reducer;
