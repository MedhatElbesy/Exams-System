import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams } from "../../store/slices/examSlice";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
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
        component="h2"
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
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {loading ? (
              <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <CircularProgress />
              </Grid>
            ) : (
              <List sx={{ width: "100%" }}>
                {exams.map((exam) => (
                  <ListItem
                    key={exam._id}
                    component={RouterLink}
                    to={`/exams/${exam._id}`}
                    sx={{
                      borderRadius: 8,
                      mb: 2,
                      bgcolor: "#ffffff",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExamList;
