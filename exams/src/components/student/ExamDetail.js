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
  Box,
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
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            className="main-textColor"
            sx={{
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            <span className="sec-textColor">Exam:</span> {exam.title} 
          </Typography>
          <Box sx={{ mb: 2, textAlign: "center", color: "#555" }}>
            <Typography variant="body1" gutterBottom sx={{fontSize: "22px"}} className="sec-textColor">
              {exam.description}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Number of Questions: {exam.questions.length}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Duration: {exam.duration} minutes
            </Typography>
          </Box>
          <Grid container justifyContent="center">
            <Button
              onClick={handleStartExam}
              variant="outlined"
              className="main-borderColor sec-textColor"
              sx={{
                mt: 3,
                fontWeight: "bold",
              }}
            >
              Start Exam
            </Button>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="body1" align="center">
          Exam not found.
        </Typography>
      )}
    </Container>
  );
};

export default ExamDetail;
