import React from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const AdminDashboard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper
        sx={{
          margin: "40px auto",
          p: 3,
          maxWidth: "600px",
          backgroundColor: "#fdfdfd",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          className="main-textColor"
          sx={{
            marginBottom: "24px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Admin Dashboard
        </Typography>
        <List component="nav">
          <ListItem
            component={Link}
            to="manage"
            className="sec-textColor"
            sx={{
              borderBottom: "1px solid #ccc",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#a8ca0036",
              },
            }}
          >
            <ListItemText primary="Manage Exams" />
          </ListItem>
          <Divider />
          <ListItem
            component={Link}
            to="create-exam"
            className="sec-textColor"
            sx={{
              borderBottom: "1px solid #ccc",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#a8ca0036",
              },
            }}
          >
            <ListItemText primary="Create Exam" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
