import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import { TodoList } from "./TodoList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="*" element={<div>404 page not found</div>} />
    </Routes>
  );
}

export default App;
