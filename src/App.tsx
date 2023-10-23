import { Route, Routes } from "react-router";
import { TodoList } from "./pages/TodoList";
import { Layout } from "./Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TodoList />} />
        <Route path="*" element={<div>404 page not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
