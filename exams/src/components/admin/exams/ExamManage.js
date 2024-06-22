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
        className="main-textColor"
        gutterBottom
        sx={{
          fontWeight: 600,
          marginBottom: "1.5rem",
        }}
      >
        Available Exams
      </Typography>
      <Grid item xs={12} md={10}>
        <Box elevation={3} sx={{ p: 2 }}>
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
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <ListItem
                    key={exam._id}
                    sx={{
                      borderRadius: 4,
                      mb: 3,
                      bgcolor: "#FFF",
                      boxShadow: "0 0px 4px #9cbb0159",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        boxShadow: "0 0px 8px #9cbb0159",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          className="sec-textColor"
                          sx={{ fontWeight: 600 }}
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
                        variant="outlined"
                        className="main-borderColor sec-textColor"
                        sx={{ mr: 1 }}
                        component={Link}
                        to={`/admin/${exam._id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        className="main-borderColor sec-textColor"
                        sx={{ mr: 1 }}
                        component={Link}
                        to={`/admin/${exam._id}/add-question`}
                      >
                        Add Question
                      </Button>
                      <Button
                        variant="outlined"
                        className="main-borderColor sec-textColor"
                        component={Link}
                        to={`/admin/exams/${exam._id}/edit-questions`}
                      >
                        Edit Questions
                      </Button>
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography
                  variant="h6"
                  align="center"
                  className="sec-textColor"
                >
                  No Exams Available
                </Typography>
              )}
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
        </Box>
      </Grid>
    </Container>
  );
};

export default ExamList;
