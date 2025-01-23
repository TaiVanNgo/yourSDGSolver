import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ProjectList from "./pages/ProjectList";
import Layout from "./pages/Layout";
import Project from "./pages/Project";
import FarmerDashboard from "./pages/FarmerDashboard";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RoleProvider } from "./context/RoleContext";
import HomePage from "./pages/HomePage";
import CarbonCreditInventory from "./pages/CarbonCreditInventory";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
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
      {
        path: "/inventory",
        element: <CarbonCreditInventory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoleProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </RoleProvider>
  </StrictMode>,
);
