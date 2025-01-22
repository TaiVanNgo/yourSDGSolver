import { Link, useLocation, useNavigate } from "react-router-dom";
import { WalletButton } from "./web3/WalletButton";
import { useAccount } from "wagmi";
import { Avatar } from "@mui/material";

const navigateLink = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Project",
    route: "/projects",
  },
  {
    name: "Dashboard",
    route: "/dashboard",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected } = useAccount();

  return (
    <div className="bg-background/95 flex w-full items-center justify-between border-b px-10 py-2 shadow-xl backdrop-blur">
      <div className="flex items-center gap-8">
        <img
          src="logo.png"
          alt="logo icon"
          className="h-16 w-16 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {navigateLink.map(
          (item, index) =>
            item.name !== "Dashboard" && (
              <Link
                key={index}
                to={item.route}
                className={`text-lg transition-colors hover:text-textColor/80 ${location.pathname === item.route ? "text-textColor" : "text-textColor/60"}`}
              >
                {item.name}
              </Link>
            ),
        )}
      </div>
      <div className="flex items-center gap-4">
        {isConnected && <p className="text-green-400">Connected</p>}
        {isConnected && <Avatar />}
        <WalletButton isConnected={isConnected} />
      </div>
    </div>
  );
};
export default Header;
