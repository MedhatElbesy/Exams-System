import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const submitExam = createAsyncThunk(
  "results/submitExam",
  async ({ examId, answers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/results/${examId}`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const fetchResults = createAsyncThunk(
  "results/fetchResults",
  async (examId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/results/${examId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const resultsSlice = createSlice({
  name: "results",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Assuming submitted exam result is added to state after submission
        state.results.push(action.payload);
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default resultsSlice.reducer;
