import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3949a0",
        color: "white",
        py: 2,
        mt: 5,
        width: "100%",
      }}
    >
      <Typography variant="body2">
        ITI &copy; 2024 Exam System, All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
