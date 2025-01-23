import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Modal,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { sepolia } from "viem/chains";
import { useRole } from "../context/RoleContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: 2,
  paddingBottom: 2,
  borderRadius: "10px",
};

const conversionRates = {
  USD: 1,
  "ETH (Sepolia)": 0.00062,
  USDC: 1.02,
};

const InvestmentModal = ({
  open,
  handleClose,
  priceString,
  walletAddress,
  projectId,
  availableCarbonCredit,
}) => {
  const { isConnected } = useAccount();
  const { id } = useRole();

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      chainId: sepolia.id,
      hash,
    });

  const [quantity, setQuantity] = useState(1);
  const price = parseFloat(priceString.replace(/[^\d.]/g, ""));
  const roundedPrice = Math.round(price * quantity * 1000) / 1000; // Rounds to 3 decimal places
  const [currency, setCurrency] = useState("USD");
  const [transactionProcessed, setTransactionProcessed] = useState(false);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const convertedPrice = roundedPrice * conversionRates[currency];

  const handleClick = async () => {
    if (!isConnected) {
      alert("Please connect the meta mask");
      return;
    }

    if (currency !== "ETH (Sepolia)") {
      alert("Please use ETH (Sepolia)");
      return;
    }

    const to = walletAddress;
    const value = convertedPrice;

    try {
      await sendTransaction({ to, value: parseEther(value.toString()) });
    } catch (err) {
      console.error("Transaction failed:", err);
    }
  };

  useEffect(() => {
    const processTransaction = async () => {
      if (isConfirmed && !transactionProcessed) {
        await buyRequest(id, projectId, quantity);
      }
    };

    processTransaction();
  }, [isConfirmed, transactionProcessed, projectId, quantity, id]);

  const buyRequest = async (userId, projectId, creditsToBuy) => {
    const apiUrl = "http://localhost:3000/api/user/buy";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, projectId, creditsToBuy }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      setTransactionProcessed(true);
    } catch (err) {
      console.error("Error posting purchase to backend:", err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={style}>
        <CardHeader
          title="Invest in project"
          subheader="Choose the number of carbon credits you want to purchase."
        />

        <CardContent className="space-y-4 !px-8">
          <div className="flex w-full items-center gap-14">
            <Typography variant="body1">Credits</Typography>
            <TextField
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              value={quantity}
              inputProps={{
                min: 1,
                max: availableCarbonCredit,
                step: 1,
              }}
              InputProps={{
                style: { textAlign: "center" },
              }}
              onChange={(e) => {
                const value = Math.max(
                  1,
                  Math.min(availableCarbonCredit, Number(e.target.value)),
                );
                setQuantity(value);
              }}
            />
          </div>
          <div className="flex w-full items-center gap-20">
            <Typography variant="body1">Price</Typography>
            <Typography variant="body1">${price} per credit</Typography>
          </div>

          <div className="flex w-full items-center gap-10">
            <Typography variant="body1">Currency</Typography>
            <Select
              value={currency}
              onChange={handleChange}
              fullWidth
              size="small"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="ETH (Sepolia)">ETH (Sepolia)</MenuItem>
              <MenuItem value="USDC">USDC</MenuItem>
            </Select>
          </div>

          <div className="!mb-2 flex w-full items-center gap-10">
            <Typography variant="body1">Total Price</Typography>
            <div className="mt-3 flex flex-col justify-center">
              <Typography variant="body1" className="!text-xl !font-bold">
                ${roundedPrice}
              </Typography>
              {currency !== "USD" ? (
                <Typography variant="body1">
                  ≈ {convertedPrice.toFixed(9)} {currency}
                </Typography>
              ) : (
                ""
              )}
            </div>
          </div>

          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "black", mt: 4 }}
            disabled={isPending}
            onClick={() => handleClick()}
          >
            {isPending || isConfirming ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Invest Now"
            )}
          </Button>
          {isConfirmed && (
            <div className="font-semibold text-green-500">
              Your transaction was successful
            </div>
          )}
          {hash && <div className="break-words">Transaction Hash: {hash}</div>}

          {error && (
            <div className="text-red-500">
              Error: {error.shortMessage || error.message}
            </div>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
};
export default InvestmentModal;
