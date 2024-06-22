import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Regular expressions for validation
  const emailRegex = /\S+@\S+\.\S+/;
  const usernameRegex = /^[a-zA-Z]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (name === "username") {
      setError(""); // Clear error when typing
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usernameRegex.test(formData.username)) {
      setError("Username should contain only alphabetic characters");
      return;
    }

    if (!formData.username) {
      setError("Please enter a valid username");
      return;
    } else if (!formData.email || !emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    } else if (!formData.password) {
      setError("Please enter a valid password");
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.success("Registered Successfully");
      navigate("/login");
    } catch (error) {
      // Handle errors
      const status = error.status;
      const message = error.data.message;
      switch (status) {
        case 400:
          toast.error(message);
          break;
        default:
          navigate("/server-error");
      }
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
          mt: 5,
          mb: 5,
          p: 4,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className="sec-textColor"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
          }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ textAlign: "center", mt: 1 }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="main-bgColor"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              ":hover": {
                backgroundColor: "#303f9f",
              },
            }}
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" className="sec-textColor">
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
