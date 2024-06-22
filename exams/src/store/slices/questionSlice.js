// src/store/slices/questionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (examId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/questions/${examId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async ({ questionId, questionData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseURL}/questions/${questionId}`,
        questionData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async ({ examId, questionId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseURL}/questions/${examId}/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return { questionId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.questions.findIndex(
          (q) => q._id === action.payload._id
        );
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = state.questions.filter(
          (q) => q._id !== action.payload.questionId
        );
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
