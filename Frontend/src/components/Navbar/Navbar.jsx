import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import memories from "../../images/image.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ toggleUser }) => {
  const theme = createTheme();

  const classes = {
    appBar: {
      borderRadius: 15,
      margin: "30px 0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 50px",
    },
    heading: {
      color: "rgb(80, 0, 255)",
      textDecoration: "none",
    },
    image: {
      marginLeft: "15px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
      width: "400px",
    },
    profile: {
      display: "flex",
      justifyContent: "space-between",
      width: "400px",
    },
    userName: {
      display: "flex",
      alignItems: "center",
    },
    brandContainer: {
      display: "flex",
      alignItems: "center",
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    dispatch({ type:'LOGOUT'});

    toggleUser();
    navigate('/'); 
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    
    if(token) {
      const decodedToken = jwtDecode(token);
      
      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout();
      }
    }
    
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])
  


  return (
    <>
      <AppBar sx={classes.appBar} position="static" color="inherit">
        <div style={classes.brandContainer}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={classes.heading} variant="h2" align="center">
              Memories
            </Typography>
          </Link>
          <img
            style={classes.image}
            src={memories}
            alt="memories"
            height="60"
          />
        </div>
        <Toolbar style={classes.toolbar}>
          {user ? (
            <div style={classes.profile}>
              <Avatar
                sx={classes.purple}
                alt={user.result.name}
                src={user.result.picture}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography style={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                style={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="contained" color="primary">
                Sign In
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
