import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Welcome = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        boxShadow: 3,
        padding: 4,
        textAlign: "center",
        mt: 5,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          background: "linear-gradient(45deg, #3f51b5 30%, #9c27b0 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Welcome to the ITI Exam System
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        sx={{
          color: "#555",
          lineHeight: 1.8,
          mb: 3,
        }}
      >
        Our platform provides a seamless and efficient way to create, manage,
        and take exams. Whether you're an educator looking to assess your
        students or a student preparing for your next big test, our system has
        you covered.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            margin: "10px 0",
          },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to={isAuthenticated ? "/home" : "/login"}
          // onClick={handleStart}
          sx={{
            backgroundColor: "#3f51b5",
            px: 4,
            py: 2,
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Welcome;
