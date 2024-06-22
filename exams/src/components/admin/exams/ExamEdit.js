import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateExam,
  fetchExamById,
  deleteExam,
} from "../../../store/slices/examSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../helpers/ConfirmationModal"; // Adjust the path as needed

const ExamEdit = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exam, loading, error } = useSelector((state) => state.exams);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchExamById(examId));
  }, [dispatch, examId]);

  useEffect(() => {
    if (exam) {
      setFormData({
        title: exam.title,
        description: exam.description,
        duration: exam.duration,
      });
    }
  }, [exam]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        updateExam({ examId, examData: formData })
      ).unwrap();
      toast.success(response.message);
      navigate("/admin/manage");
    } catch (error) {
      const message = error.data.message;
      switch (error.status) {
        case 400:
          toast.error(message);
          break;
        default:
          navigate("/server-error");
      }
    }
  };

  const handleDelete = async () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await dispatch(deleteExam(examId)).unwrap();
      toast.success(response.message);
      navigate("/admin/manage");
    } catch (error) {
      const message = error.data.message;
      switch (error.status) {
        case 400:
          toast.error(message);
          break;
        default:
          navigate("/server-error");
      }
    } finally {
      setDeleteDialogOpen(false);
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
            sx={{ fontSize: "28px", p: 1 }}
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
            Edit Exam
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Exam Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Exam Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Exam Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Box sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="outlined"
                className="main-borderColor sec-textColor"
                sx={{ mt: 2, mr: 2, fontWeight: "bold" }}
              >
                Edit Exam
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2, mr: 2 }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          </form>
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
        </Paper>
      )}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete Exam"
        message="Are you sure you want to delete this exam?"
      />
    </Container>
  );
};

export default ExamEdit;
