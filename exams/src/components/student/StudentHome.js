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
        sx={{ color: "#3949a0", fontWeight: "bold" }}
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
                border: "1px solid #3949a0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ color: "#1a237e" }}
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
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      backgroundColor: "#3949a0",
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
          {/* <Grid item xs={12} sm={6}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#f0f4ff",
                border: "1px solid #3949a0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ color: "#1a237e" }}
                >
                  View Results
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check your exam results and track your progress.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    component={RouterLink}
                    to="/results"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      backgroundColor: "#3949a0",
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
          </Grid> */}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
