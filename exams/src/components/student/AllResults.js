import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchAllResults } from "../../store/slices/resultSlice";

const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allResults, loading, error } = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(fetchAllResults());
  }, [dispatch]);

  const formattedDate = (createdAt) => {
    return new Date(createdAt).toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button
          sx={{ fontSize: "28px", p: 1 }}
          className="sec-textColor"
          onClick={() => navigate("/home")}
        >
          ⬅
        </Button>
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
          All Results
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
            {allResults.length > 0 ? (
              allResults.map((result) => (
                <ListItem
                  key={result._id}
                  disablePadding
                  sx={{
                    borderRadius: 2,
                    mb: 2,
                    bgcolor: "#f5f5f5",
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
                        className="main-textColor"
                        sx={{ fontWeight: "bold" }}
                      >
                        <span className="sec-textColor">Exam: </span> {`${result.exam.title}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body1" sx={{ color: "#555" }}>
                          Score: {result.score} / {result.exam.questions.length}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#555" }}>
                          Date: {formattedDate(result.createdAt)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="h6" align="center" className="sec-textColor">
                No Results Available
              </Typography>
            )}
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
