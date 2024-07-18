import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { CircularProgress, Grid } from "@mui/material";

const Posts = ({ setCurrentId }) => {
  const theme = useTheme();

  const postStyles = {
    mainContainer: {
      display: "flex",
      alignItems: "center",
    },
    smMargin: {
      margin: theme.spacing(1),
    },
    actionDiv: {
      textAlign: "center",
    },
  };

  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <div>
      <CircularProgress />
      <h2 color="white">No posts here yet...</h2>
    </div>
  ) : (
    <Grid
      style={postStyles.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} key={post.id} setCurrentId = {setCurrentId}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;