import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "../../../index.css";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  fetchQuestions,
  updateQuestion,
  deleteQuestion,
} from "../../../store/slices/questionSlice";
import ConfirmationModal from "../../helpers/ConfirmationModal";

const QuestionsEdit = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.questions);
  const [questions, setQuestions] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(fetchQuestions(examId)).unwrap();
        setQuestions(response);
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data;
        switch (status) {
          case 400:
            toast.error(message);
            break;
          default:
            navigate("/server-error");
        }
      }
    })();
  }, [dispatch, examId, navigate]);

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, [name]: value } : question
      )
    );
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const { value } = e.target;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) => {
        if (i === qIndex) {
          const updatedOptions = question.options.map((option, j) =>
            j === oIndex ? value : option
          );
          return { ...question, options: updatedOptions };
        }
        return question;
      })
    );
  };

  const handleEditQuestion = async (questionId, index) => {
    const questionData = questions[index];
    try {
      const response = await dispatch(
        updateQuestion({ questionId, questionData })
      ).unwrap();
      toast.success(response.message);
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data;
      switch (status) {
        case 400:
          toast.error(message);
          break;
        default:
          navigate("/server-error");
      }
    }
  };

  const handleDelete = async (questionId) => {
    setDeleteQuestionId(questionId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await dispatch(
        deleteQuestion({ examId, questionId: deleteQuestionId })
      ).unwrap();
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q._id !== deleteQuestionId)
      );
      toast.success(response.message);
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data;
      switch (status) {
        case 400:
          toast.error(message);
          break;
        default:
          navigate("/server-error");
      }
    } finally {
      setDeleteModalOpen(false);
      setDeleteQuestionId(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {loading ? (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Button
            sx={{ fontSize: "28px", p: 1, backgroundColor: "#fdfdfd" }}
            className="sec-textColor"
            onClick={() => navigate("/admin/manage")}
          >
            ⬅
          </Button>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            className="main-textColor"
          >
            Edit Questions
          </Typography>
          {questions.length > 0 ? (
            questions.map((question, qIndex) => (
              <Box key={question._id} sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  className="sec-textColor"
                >
                  Question {qIndex + 1}
                </Typography>
                <TextField
                  fullWidth
                  label="Question"
                  name="question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  margin="normal"
                  required
                />
                {question.options.map((option, oIndex) => (
                  <TextField
                    key={oIndex}
                    fullWidth
                    label={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                    margin="normal"
                    required
                  />
                ))}
                <TextField
                  fullWidth
                  label="Answer"
                  name="answer"
                  value={question.answer}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  margin="normal"
                  required
                />
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    className="main-borderColor sec-textColor"
                    sx={{ mt: 2, mr: 2, fontWeight: "bold" }}
                    onClick={() => handleEditQuestion(question._id, qIndex)}
                  >
                    Edit Question
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(question._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="h6" align="center" className="sec-textColor">
              No Questions Available
            </Typography>
          )}
          {error && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
            >
              {error}
            </Typography>
          )}
          <ConfirmationModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Confirm Delete Question"
            message="Are you sure you want to delete this question?"
          />
        </Paper>
      )}
    </Container>
  );
};

export default QuestionsEdit;
