import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button as MuiButton,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import logoImage from "../../assets/logo.png";
import { styled } from "@mui/system";

const StyledButton = styled(MuiButton)(({ theme }) => ({
  color: "#9cbb01",
  fontWeight: "bold",
  "&:hover": {
    color: "#FFF",
    backgroundColor: "#9cbb01",
  },
}));

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
    <AppBar position="static" sx={{ flexGrow: 1 }} className="main-bgColor">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src={logoImage}
              alt="Logo"
              style={{ height: 40, marginRight: 10 }}
            />
          </Link>
        </Box>
        {isLoggedIn ? (
          <>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                {sessionStorage.getItem("user")}
              </Typography>
            </Box>
            <Box sx={{ flexBasis: "33.33%", textAlign: "right" }}>
              {isAdmin && (
                <>
                  <StyledButton
                    color="inherit"
                    component={Link}
                    to="/admin/manage"
                  >
                    Manage
                  </StyledButton>
                  <StyledButton
                    color="inherit"
                    component={Link}
                    to="/admin/create-exam"
                  >
                    Create
                  </StyledButton>
                </>
              )}
              {!isAdmin && (
                <StyledButton color="inherit" component={Link} to="/exams">
                  Exams
                </StyledButton>
              )}
              <StyledButton
                color="inherit"
                onClick={handleLogout}
                component={Link}
                to="/"
                sx={{
                  color: "#dc3545",
                  "&:hover": {
                    color: "#FFF",
                    backgroundColor: "#dc3545",
                  },
                }}
              >
                Logout
              </StyledButton>
            </Box>
          </>
        ) : (
          <>
            <StyledButton color="inherit" component={Link} to="/login">
              Login
            </StyledButton>
            <StyledButton color="inherit" component={Link} to="/register">
              Register
            </StyledButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
