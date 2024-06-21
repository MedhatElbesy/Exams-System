import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { fetchResults } from "../../store/slices/resultSlice";

const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { examId } = useParams();
  const { results, loading, error } = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(fetchResults(examId));
  }, [dispatch, examId]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 4,
          backgroundColor: "#f3f4f6",
          boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button
          sx={{ fontSize: "28px", p: 1 }}
          color="secondary"
          onClick={() => navigate("/exams")}
        >
          ⬅
        </Button>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            color: "#1a237e",
            fontWeight: 600,
            marginBottom: "1.5rem",
          }}
        >
          Exam Result
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ width: "100%" }}>
            {results.map((result) => (
              <ListItem
                key={result._id}
                disablePadding
                sx={{
                  borderRadius: 2,
                  mb: 2,
                  bgcolor: "#fff",
                  border: "1px solid #D1D1D1",
                  textAlign: "center",
                  p: 2,
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{ color: "#1a237e", fontWeight: 600 }}
                    >
                      {result.exam && result.exam.title
                        ? `${result.exam.title} Exam:`
                        : "Unknown Exam:"}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" sx={{ color: "#555" }}>
                      Score: {result.score} / {result.exam.questions.length}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        {error && (
          <Typography
            variant="body1"
            color="error"
            sx={{ mt: 2, textAlign: "center" }}
          >
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Results;
