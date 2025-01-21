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
import ConnectWallet from "./pages/web3/ConnectWallet";
import { SendTransaction } from "./pages/web3/SendTransaction";

const queryClient = new QueryClient();

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

      {
        path: "/web3",
        element: <ConnectWallet />,
      },

      {
        path: "/transaction",
        element: <SendTransaction />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);
