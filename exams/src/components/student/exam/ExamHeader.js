import React from "react";
import { Typography, Grid } from "@mui/material";

const ExamHeader = ({ title, timeLeft }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <Grid item xs={12} sx={{ textAlign: "center", marginBottom: 3 }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        className="main-textColor"
        sx={{ fontWeight: 600 }}
      >
        {title} Exam
      </Typography>
      <Typography
        variant="h5"
        component="p"
        gutterBottom
        sx={{ color: "#555" }}
      >
        Time Left: {formatTime(timeLeft)}
      </Typography>
    </Grid>
  );
};

export default ExamHeader;
