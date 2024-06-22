import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../index.css";
import { toast } from "react-toastify";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const baseURL = "http://127.0.0.1:8000/api";

const QuestionCreate = () => {
  const navigate = useNavigate();
  const { examId } = useParams();


  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
    examId,
  });

  const handleChange = (e, index) => {
    if (e.target.name === "options") {
      const updatedOptions = [...formData.options];
      updatedOptions[index] = e.target.value;
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/questions`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);
      setFormData({
        question: "",
        options: ["", "", "", ""],
        answer: "",
        examId,
      });
      // navigate(`/admin/manage`);
    } catch (error) {
      const status = error.response.status;
      const message = error.response.data;
      switch (status) {
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
          backgroundColor: "#fdfdfd",
          borderRadius: 8,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Button
          sx={{ fontSize: "28px", p: 1 }}
          className="sec-textColor"
          onClick={() => navigate("/admin/manage")}
        >
          ⬅
        </Button>
        <Typography
          variant="h4"
          component="h3"
          align="center"
          gutterBottom
          className="main-textColor"
        >
          Add New Question
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="question"
            name="question"
            label="Question"
            variant="outlined"
            value={formData.question}
            onChange={handleChange}
            placeholder="Question"
            required
            sx={{ mb: 2 }}
          />
          {formData.options.map((option, index) => (
            <TextField
              key={index}
              fullWidth
              id={`option${index + 1}`}
              name="options"
              label={`Option ${index + 1}`}
              variant="outlined"
              value={option}
              onChange={(e) => handleChange(e, index)}
              placeholder={`Option ${index + 1}`}
              required
              sx={{ mb: 2 }}
            />
          ))}
          <TextField
            fullWidth
            id="answer"
            name="answer"
            label="Answer"
            variant="outlined"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Answer"
            required
            sx={{ mb: 2 }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="outlined"
              className="main-borderColor sec-textColor"
              sx={{ mt: 2 }}
            >
              Add Question
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default QuestionCreate;
