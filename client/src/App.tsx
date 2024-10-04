import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import UpdateTodo from "./components/UpdateTodo";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { getTodo } from "./redux/slice/todoSlice";
import { Button, CssBaseline, ThemeProvider } from "@material-ui/core";
import { darkTheme, lightTheme } from "./components/Theme";

function App() {
  const [mode, setMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = mode ? darkTheme : lightTheme;
    document.body.style.setProperty(
      "--background-color",
      theme.palette.background.default
    );
    document.body.style.setProperty("--text-color", theme.palette.text.primary);
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={mode ? darkTheme : lightTheme}>
        <CssBaseline/>
            
          
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/create" element={<CreateTodo />} />
              <Route path="/edit/:id" element={<UpdateTodo />} />
            </Routes>
            </BrowserRouter>
            
      </ThemeProvider>
    </>
  );
}

export default App;
