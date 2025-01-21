import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ProjectList from "./pages/ProjectList";
import Layout from "./pages/Layout";
import Project from "./pages/Project";
import FarmerDashboard from "./pages/FarmerDashboard";

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
        path: "/dashboard",
        element: <FarmerDashboard />,
      },
      {
        path: "/projects",
        element: <ProjectList />,
      },
      {
        path: "/projects/:projectId",
        element: <Project />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
