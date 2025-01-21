import { useAccount } from "wagmi";
import { Account } from "./Account";
import { WalletButton } from "./WalletButton";

const ConnectWallet = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;

  return <WalletButton />;
};
export default ConnectWallet;
