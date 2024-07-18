import { useState, useEffect } from "react";
import { Grow, Grid, Container, Paper, Typography } from "@mui/material";
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Form from "../Form/Form";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const classes = {
    appBar: {
      borderRadius: 15,
      margin: "30px 0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    heading: {
      color: "rgba(0,183,255, 1)",
    },
    image: {
      marginLeft: "15px",
    },
    paper: {
      padding: 16,
    },
    // mainContainer: {
    //   flexDirection: "column-reverse",
    // },
  };

  const [currentId, setCurrentId] = useState(0);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();

  const toggleUser = () => {
    setUser(JSON.parse(localStorage.getItem('profile')) || null);
  }

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <Navbar toggleUser = {toggleUser}/>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            style={classes.mainContainer}
          >
            <Grid item xs={12} sm={7} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
