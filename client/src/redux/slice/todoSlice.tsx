import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error:null
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodo: (state, action) => {
      state.todos = action.payload.data.map((todo: any) => {
        return {
          _id: todo._id,
          title: todo.title,
          description: todo.description,
          status: todo.status,
        };
      });
    },

    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
        const { id, title, description, status } = action.payload;
        const index = state.todos.findIndex((todo) => todo._id === id);
      
        if (index !== -1) {
          state.todos[index] = { _id: id, title, description, status };
        }
      
    },
    deleteTodo: (state, action) => {
      const id = action.payload.id;
      state.todos = state.todos.filter((x) => x._id !== id);
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
 
});

export const { getTodo, addTodo, updateTodo, deleteTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
