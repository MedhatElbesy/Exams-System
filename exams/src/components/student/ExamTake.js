import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitExam } from "../../store/slices/resultSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, CircularProgress, Grid } from "@mui/material";
import ExamHeader from "./exam/ExamHeader";
import AnswerForm from "./exam/AnswerForm";
import Timer from "./exam/Timer";
import { toast } from "react-toastify";


const ExamTake = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { exams, loading } = useSelector((state) => state.exams);
  const exam = exams.find((exam) => exam._id === examId);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState((exam?.duration ?? 0) * 60);

  const handleChange = (e, questionId) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(
      (ans) => ans.questionId === questionId
    );
    if (existingIndex !== -1) {
      newAnswers[existingIndex].selectedOption = e.target.value;
    } else {
      newAnswers.push({ questionId, selectedOption: e.target.value });
    }
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(submitExam({ examId, answers })).unwrap();
      navigate(`/exams/${examId}/results`);
    } catch (error) {
      // Handle errors
      const status = error.status;
      const message = error.data.message;
      switch (status) {
        case 400:
          toast.error(message);
          break;
        default:
          navigate("server-error");
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ExamHeader title={exam.title} timeLeft={timeLeft} />
          </Grid>
          <Grid item xs={12}>
            <AnswerForm
              exam={exam}
              answers={answers}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Paper>
    </Container>
  );
};

export default ExamTake;
