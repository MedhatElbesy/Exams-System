import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError("Please enter a valid email address");
      return;
    } else if (!formData.password) {
      setError("Please enter a valid password");
      return;
    }
    try {
      await dispatch(loginUser(formData)).unwrap();
      sessionStorage.getItem("isAdmin")
        ? navigate("/admin")
        : navigate("/home");
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
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setError("")}
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
            onFocus={() => setError("")}
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
            color="primary"
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
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register" className="sec-textColor">
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
