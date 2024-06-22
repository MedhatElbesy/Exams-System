import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams } from "../../store/slices/examSlice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
} from "@mui/material";

const ExamList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams, loading, error } = useSelector((state) => state.exams);

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  const handelExamNavigation = (examId) => {
    sessionStorage.getItem("isAdmin")
      ? navigate(`/admin/${examId}/edit`)
      : navigate(`/exams/${examId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        className="main-textColor"
        sx={{
          fontWeight: 600,
          marginBottom: "1.5rem",
        }}
      >
        Available Exams
      </Typography>
      {exams.length > 0 ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Box>
              {loading ? (
                <Grid container justifyContent="center" sx={{ mt: 4 }}>
                  <CircularProgress />
                </Grid>
              ) : (
                <List sx={{ width: "100%" }}>
                  {exams.map((exam) => (
                    <ListItem
                      key={exam._id}
                      onClick={() =>
                        exam.questions.length > 0 &&
                        handelExamNavigation(exam._id)
                      }
                      sx={{
                        borderRadius: 2,
                        mb: 2,
                        bgcolor:
                          exam.questions.length === 0 ? "#e1e1e1" : "#FFF",
                        transition: "background-color 0.3s",
                        border: "1px solid #e4e4e4",
                        "&:hover": {
                          bgcolor:
                            exam.questions.length === 0 ? "#e1e1e1" : "#f5f5f5",
                          cursor:
                            exam.questions.length === 0 ? "auto" : "pointer",
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="h6"
                              className="sec-textColor"
                              sx={{
                                color: exam.questions.length === 0 && "#555 !important",
                                fontWeight: 600,
                              }}
                            >
                              {exam.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#555" }}>
                              {exam.questions.length} questions |{" "}
                              {exam.duration} minutes
                            </Typography>
                          </>
                        }
                        secondary={
                          <Typography variant="body1" sx={{ color: "#555" }}>
                            {exam.description}
                          </Typography>
                        }
                      />
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
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" align="center" className="sec-textColor">
          No Exams Available
        </Typography>
      )}
    </Container>
  );
};

export default ExamList;
