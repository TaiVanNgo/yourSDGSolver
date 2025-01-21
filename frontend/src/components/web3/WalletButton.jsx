import { Button } from "@mui/material";
import { useConnect, useDisconnect } from "wagmi";

export function WalletButton({ isConnected }) {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (!connectors.length) {
    return <div>No wallet connector available.</div>;
  }

  const metaMaskConnector = connectors[0];

  const handleClick = async () => {
    try {
      if (isConnected) {
        await disconnect();
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
