import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <>
          <Button color="inherit" component={Link} to="/exams">
            Exams
          </Button>
          {/* <Typography variant="h6" sx={{ marginRight: 2 }}>
            {user?.username}
          </Typography> */}
          <Button
            color="inherit"
            onClick={handleLogout}
            component={Link}
            to="/"
          >
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </>
      );
    }
  };

  return (
    <AppBar position="static" sx={{ flexGrow: 1, backgroundColor: "#3949a0" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
        </Typography>
        {renderAuthButtons()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
