import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { fetchResults } from "../../store/slices/resultSlice";

const Results = () => {
  const dispatch = useDispatch();
  const { examId } = useParams();
  const { results, loading, error } = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(fetchResults(examId));
  }, [dispatch, examId]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ color: "#3949a0" }}
        >
          Exam Results
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
                  transition: "background-color 0.3s",
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{ color: "#333", fontWeight: "bold" }}
                    >
                      {result.exam && result.exam.title
                        ? `${result.exam.title} Exam:`
                        : "Unknown Exam:"}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" sx={{ color: "#666" }}>
                      Score: {result.score}
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
