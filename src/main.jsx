import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ProjectList from "./pages/ProjectList";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>HOME</p>,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/projects",
        element: <ProjectList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
