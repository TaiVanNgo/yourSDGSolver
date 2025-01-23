import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRole } from "../../context/RoleContext";

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { role, setRole, id, setId } = useRole(null);

  useEffect(() => {
    if (address && isConnected) {
      login(address);
    }
  }, [address, isConnected]);

  const login = async (walletAddress) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Login error:", data.error);
        return;
      }

      setId(data.id);
      setRole(data.role); // Store the user's role
      console.log("Login successful:", data.role);
    } catch (error) {
      console.error("Error during login request:", error);
    }
  };

  if (!connectors.length) {
    return <div>No wallet connector available.</div>;
  }

  const metaMaskConnector = connectors[0];

  const handleClick = async () => {
    try {
      if (isConnected) {
        await disconnect();
        setRole(null); // Clear role on disconnect
      } else {
        await connect({ connector: metaMaskConnector });
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={() => handleClick()}
      className="!bg-transparent !text-textColor !shadow-sm"
      sx={{
        border: "1px solid #ccc",
      }}
    >
      {isConnected ? "Disconnect" : "Connect MetaMask"}
    </Button>
  );
}
