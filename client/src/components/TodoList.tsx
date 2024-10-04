import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import { deleteTodo, setTodos } from "../redux/slice/todoSlice";
import { darkTheme, lightTheme } from "./Theme";
import {
  Button,
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

const TodoList = () => {
  const [noTodosFound, setNoTodosFound] = useState(false);
  const [mode, setMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const userTodo = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );


  const fetchTodos = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/todo", {
        params: {
          query: searchQuery,
          sort: sortOrder,
          filter: statusFilter,
        },
      });
      if (data.data.length === 0) {
        setNoTodosFound(true);
      } else {
        setNoTodosFound(false);
      }
      dispatch(setTodos(data.data));
    } catch (error) {
      console.error("Error fetching todos:", error);
      setNoTodosFound(true);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, [searchQuery, statusFilter, sortOrder, dispatch]);

  useEffect(() => {
    const theme = mode ? darkTheme : lightTheme;
    document.body.style.setProperty(
      "--background-color",
      theme.palette.background.default
    );
    document.body.style.setProperty("--text-color", theme.palette.text.primary);
  }, [mode]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/todo/${id}`);
      dispatch(deleteTodo({ id }));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchTodos();
  };

  const handleReset = () => {
    setSearchQuery("");
    setStatusFilter("");
    setSortOrder("");
  };

  const handleStatusFilterChange = (e: SelectChangeEvent<string>) => {
    setStatusFilter(e.target.value);
  };

  const handleSortOrderChange = (e: SelectChangeEvent<string>) => {
    console.log(e.target.value, "sort");
    setSortOrder(e.target.value);
  };

  const toggleTheme = () => {
    setMode((prevMode) => !prevMode);
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <Button
        component={Link}
        to="/create"
        variant="contained"
        color="success"
        size="small"
      >
        Add Todo
      </Button>
      <Button
        onClick={toggleTheme}
        variant="contained"
        color="secondary"
        size="small"
        style={{ marginLeft: 8 }}
      >
        Toggle Theme
      </Button>
      <form onSubmit={handleSearch} style={{ margin: "16px 0" }}>
        <TextField
          label="Search todos..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <Button type="submit" variant="contained" color="success" size="small">
          Search
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="error"
          size="small"
          onClick={handleReset}
          style={{ marginLeft: 8 }}
        >
          Reset
        </Button>
      </form>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          label="Status"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOrder}
          onChange={handleSortOrderChange}
          label="Sort By"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </FormControl>
      {noTodosFound && (
        <Typography variant="h6" color="error" style={{ marginBottom: 16 }}>
          No todos found.
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userTodo?.map((todo) => (
              <TableRow key={todo._id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>{todo.status}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/edit/${todo._id}`}
                    variant="contained"
                    color="success"
                    size="small"
                    style={{ marginRight: 8 }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(todo._id)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    // <div className="d-flex min-vh-100 justify-content-center align-items-center" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
    //   <div className="w-50 rounded p-3">
    //     <Link to="/create" className="btn btn-success btn-sm">
    //       Add Todo
    //     </Link>
    //     <button onClick={toggleTheme} className="btn btn-secondary btn-sm ms-2">
    //       Toggle Theme
    //     </button>
    //     <form onSubmit={handleSearch} className="my-3">
    //       <div className="d-flex gap-3">
    //         <input
    //           type="text"
    //           placeholder="Search todos..."
    //           value={searchQuery}
    //           className="form-control"
    //           onChange={(e) => setSearchQuery(e.target.value)}
    //         />
    //         <button type="submit" className="btn btn-success">Search</button>
    //         <button type="button" className="btn btn-danger" onClick={handleReset}>Reset</button>
    //       </div>
    //     </form>
    //     <div className="my-3">
    //       <select value={statusFilter} onChange={handleStatusFilterChange} className="form-select">
    //         <option value="">All</option>
    //         <option value="todo">Todo</option>
    //         <option value="in progress">In Progress</option>
    //         <option value="done">Done</option>
    //       </select>
    //     </div>
    //     <div className="my-3">
    //       <select value={sortOrder} onChange={handleSortOrderChange} className="form-select">
    //         <option value="">Sort By</option>
    //         <option value="latest">Latest</option>
    //         <option value="oldest">Oldest</option>
    //       </select>
    //     </div>
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th>Title</th>
    //           <th>Description</th>
    //           <th>Status</th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {userTodo?.map((todo) => (
    //           <tr key={todo?._id}>
    //             <td>{todo?.title}</td>
    //             <td>{todo?.description}</td>
    //             <td>{todo?.status}</td>
    //             <td>
    //               <Link to={`/edit/${todo?._id}`} className="btn btn-success btn-sm">
    //                 Update
    //               </Link>
    //               <button onClick={() => handleDelete(todo._id)} className="btn btn-danger btn-sm mx-2">
    //                 Delete
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default TodoList;
