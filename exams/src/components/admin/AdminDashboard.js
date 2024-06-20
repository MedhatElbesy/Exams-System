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
        style={{
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
          style={{
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
            to="/exams"
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <ListItemText primary="Manage Exams" />
          </ListItem>
          <Divider />
          <ListItem
            component={Link}
            to="/admin/create-exam"
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <ListItemText primary="Create Exam" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
