import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addTodo } from "../redux/slice/todoSlice";
import { stat } from "fs";
import {
  Container,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Alert,
} from "@mui/material";
const CreateTodo: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState("todo");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !status) {
      setError("All fields are required");
      setSuccess(null);
    }
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof status !== "string"
    ) {
      setError("Title, description, and status must be strings");
      setSuccess(null);
    }
    if (/\d/.test(title) || /\d/.test(description)) {
      setError("Title and description must not contain numbers");
      return;
    }
    const todo = {
      title,
      description,
      status,
    };
    try {
      const response = await axios.post(`http://localhost:8080/todo`, todo);
      dispatch(addTodo(response.data.data));
      setError(null);
      setSuccess("Todo added successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
      setSuccess(null);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Box
            p={3}
            bgcolor="white"
            borderRadius={2}
            boxShadow={3}
            width="100%"
          >
            <form onSubmit={handleSubmit}>
              <Typography variant="h4" gutterBottom>
                Add Todo
              </Typography>
              {error && (
                <Box mb={2}>
                  <Alert severity="error">{error}</Alert>
                </Box>
              )}
              {success && (
                <Box mb={2}>
                  <Alert severity="success">{success}</Alert>
                </Box>
              )}

              <Box mb={2}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="todo">Todo</MenuItem>
                    <MenuItem value="in progress">In Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Todo
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CreateTodo;
