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
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to the Exam System!
      </Typography>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
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
                  >
                    View Exams
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
