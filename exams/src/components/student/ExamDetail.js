import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

const ExamDetail = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { exams, loading } = useSelector((state) => state.exams);
  const exam = exams.find((exam) => exam._id === examId);

  const handleStartExam = () => {
    navigate(`/exams/${examId}/take`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : exam ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {exam.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {exam.description}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Number of Questions: {exam.questions.length}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Duration: {exam.duration} minutes
          </Typography>
          <Button
            onClick={handleStartExam}
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Start Exam
          </Button>
        </Paper>
      ) : (
        <Typography variant="body1">Exam not found.</Typography>
      )}
    </Container>
  );
};

export default ExamDetail;
