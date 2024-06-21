import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    sessionStorage.getItem("token")
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);

    sessionStorage.getItem("isAdmin") ? setIsAdmin(true) : setIsAdmin(false);
  }, [isAuth]);

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
  };

  return (
    <AppBar position="static" sx={{ flexGrow: 1, backgroundColor: "#3949a0" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
        </Typography>
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/manage"
                >
                  Manage
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/create-exam"
                >
                  Create
                </Button>
              </>
            )}
            {!isAdmin && (
              <Button color="inherit" component={Link} to="/exams">
                Exams
              </Button>
            )}
            <Button
              color="inherit"
              onClick={handleLogout}
              component={Link}
              to="/"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
