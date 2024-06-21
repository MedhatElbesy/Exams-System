import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams } from "../../../store/slices/examSlice";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Button,
  Box,
} from "@mui/material";

const ExamList = () => {
  const dispatch = useDispatch();
  const { exams, loading, error } = useSelector((state) => state.exams);

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: "#3949a0",
          marginBottom: "1.5rem",
        }}
      >
        Available Exams
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {loading ? (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ height: 300 }}
              >
                <CircularProgress />
              </Grid>
            ) : (
              <List sx={{ width: "100%" }}>
                {exams.map((exam) => (
                  <ListItem
                    key={exam._id}
                    sx={{
                      borderRadius: 4,
                      mb: 2,
                      bgcolor: "#ffffff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          sx={{ color: "#3949a0", fontWeight: 600 }}
                        >
                          {exam.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" sx={{ color: "#666" }}>
                          {exam.description}
                        </Typography>
                      }
                    />
                    <Box sx={{ ml: "auto", display: "flex" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                        component={Link}
                        to={`/admin/${exam._id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: 1 }}
                        component={Link}
                        to={`/admin/${exam._id}/add-question`}
                      >
                        Add Question
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={`/admin/exams/${exam._id}/edit-questions`}
                      >
                        Edit Questions
                      </Button>
                    </Box>
                  </ListItem>
                ))}
              </List>
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExamList;
