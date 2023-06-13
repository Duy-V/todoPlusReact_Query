import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import TodoFormPage from "./pages/TodoFormPage";
import TagFormPage from "./pages/TagFormPage";
import TagsListPage from "./pages/TagsListPage";
import TagEdittedPage from "./pages/TagEdittedPage";
import TodoEdittedPage from "./pages/TodoEdittedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tags/list", element: <TagsListPage /> },
      { path: "/tags/create", element: <TagFormPage /> },
      { path: "/tags/:id", element: <TagEdittedPage /> },
      { path: "todos/create", element: <TodoFormPage /> },
      { path: "todos/:id", element: <TodoEdittedPage /> },
    ],
  },
]);

export default router;
