import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        className="sec-textColor"
        sx={{ fontWeight: "bold" }}
      >
        Welcome to Exam System
      </Typography>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#f0f4ff",
                border: "1px solid #1a237e",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.01)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  className="sec-textColor"
                >
                  Take an Exam
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose from a variety of exams to take and test your
                  knowledge.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    component={RouterLink}
                    to="/exams"
                    fullWidth
                    className="main-bgColor"
                    sx={{
                      color: "#FFF",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#1a237e",
                      },
                    }}
                  >
                    View Exams
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#f0f4ff",
                border: "1px solid #1a237e",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.01)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  className="sec-textColor"
                >
                  View All Results
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check your exam results for all exams and track your progress.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    component={RouterLink}
                    to="/results"
                    fullWidth
                    className="main-bgColor"
                    sx={{
                      color: "#FFF",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#1a237e",
                      },
                    }}
                  >
                    View Results
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
