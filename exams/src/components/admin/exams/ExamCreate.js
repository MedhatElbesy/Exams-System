import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createExam } from "../../../store/slices/examSlice";
import { useNavigate } from "react-router-dom";
import "../../../index.css";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";

const ExamCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExam = await dispatch(createExam(formData)).unwrap();
      toast.success("Exam Created Successfully")
      navigate(`/admin/${newExam.id}/add-question`);
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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Button
          sx={{ fontSize: "28px", p: 1 }}
          className="sec-textColor"
          onClick={() => navigate("/admin")}
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
          Create New Exam
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Exam Title"
                variant="outlined"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Exam Description"
                variant="outlined"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="duration"
                name="duration"
                label="Exam Duration (in minutes)"
                type="number"
                variant="outlined"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="outlined"
              className="main-borderColor sec-textColor"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              Create Exam
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ExamCreate;
