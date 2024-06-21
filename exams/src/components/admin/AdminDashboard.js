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
          padding: "32px",
          maxWidth: "600px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            marginBottom: "24px",
            textAlign: "center",
            color: "#3949a0",
            fontWeight: "bold",
          }}
        >
          Admin Dashboard
        </Typography>
        <List component="nav">
          <ListItem
            component={Link}
            to="manage"
            sx={{
              borderBottom: "1px solid #ccc",
              color: "#3949a0",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ListItemText primary="Manage Exams" />
          </ListItem>
          <Divider />
          <ListItem
            component={Link}
            to="create-exam"
            sx={{
              borderBottom: "1px solid #ccc",
              color: "#3949a0",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#e0e0e0",
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
