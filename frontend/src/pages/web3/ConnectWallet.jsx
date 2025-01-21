import { useAccount } from "wagmi";
import { Account } from "./Account";
import { WalletOptions } from "./WalletOption";

const ConnectWallet = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;

  return <WalletOptions />;
};
export default ConnectWallet;
