import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName || undefined });

  const navigate = useNavigate();

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <Button onClick={() => navigate("/transaction")}>
        Go to send transaction
      </Button>
      <br />
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
