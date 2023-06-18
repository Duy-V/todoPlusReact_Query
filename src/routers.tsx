import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import TodoFormPage from "./pages/TodoFormPage";
import TagFormPage from "./pages/TagFormPage";
import TagsListPage from "./pages/TagsListPage";
import TagEdittedPage from "./pages/TagEdittedPage";
import TodoEdittedPage from "./pages/TodoEdittedPage";
import TodoListPage from "./pages/TodoListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "todos?page=1", element: <HomePage /> },
      { path: "tags/list", element: <TagsListPage /> },
      { path: "/tags/create", element: <TagFormPage /> },
      { path: "/tags/:id", element: <TagEdittedPage /> },
      { path: "todos", element: <TodoListPage /> },
      { path: "todos/create", element: <TodoFormPage /> },
      { path: "todos/:id", element: <TodoEdittedPage /> },
    ],
  },
]);

export default router;
