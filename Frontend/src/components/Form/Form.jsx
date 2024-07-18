import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const formStyles = {
    paper: {
      padding: 16,
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    fileInput: {
      width: "97%",
      margin: "10px 0",
    },
    buttonSubmit: {
      marginBottom: 10,
    },
  };

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem('profile'));
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clearForm = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clearForm();
    } else {
      // console.log(postData);
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clearForm();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper style={formStyles.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create and share your own memories !
        </Typography>
      </Paper>
    );
  }

    return (
      <Paper style={formStyles.paper}>
        <form
          style={formStyles.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, overflow: "auto" }}>
            {currentId ? `Editing ${post.title}` : "Creating a Memory"}
          </Typography>
          <TextField
            sx={{ marginBottom: 1 }}
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            sx={{ marginBottom: 1 }}
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            sx={{ marginBottom: 1 }}
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div style={formStyles.fileInput}>
            <FileBase64
              sx={{ marginBottom: 1 }}
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            style={formStyles.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clearForm}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    );
  }
;

export default Form;
