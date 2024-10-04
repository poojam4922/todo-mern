import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/slice/todoSlice";
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
const UpdateTodo = () => {
  const { id } = useParams();
  const toDos = useSelector((state: any) => state.todos.todos);
  const todo = toDos.find((todo: any) => todo._id === id);
  const [title, setTitle] = useState<string>(todo?.title || "");
  const [description, setDescription] = useState<string>(
    todo?.description || ""
  );
  const [status, setStatus] = useState(todo?.status || "todo");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    }
  }, [todo]);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/todo/${id}`, { title, description, status })
      .then((res) => {
        dispatch(updateTodo({ id, title, description, status }));
        setError(null);
        setSuccess("Todo updated successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setError("An error occurred while updating the todo");
        setSuccess(null);
      });
  };
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box p={3} bgcolor="white" borderRadius={2} boxShadow={3} width="100%">
          <form onSubmit={handleUpdate}>
            <Typography variant="h4" gutterBottom>
              Update Todo
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Todo
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateTodo;
