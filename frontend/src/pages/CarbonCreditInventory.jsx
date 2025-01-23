import { Card, CardContent, CardHeader, Chip } from "@mui/material";
import { default as CarbonIcon } from "@mui/icons-material/Co2Outlined";
import { default as TickIcon } from "@mui/icons-material/DoneOutlined";
import { default as CloseIcon } from "@mui/icons-material/CloseOutlined";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useRole } from "../context/RoleContext";

const CarbonCreditInventory = () => {
  const { id } = useRole();

  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchInventory = async () => {
    if (!id) return; // Do nothing if id is not yet available

    console.log("Fetching inventory for user ID:", id);
    const apiUrl = `http://localhost:3000/api/user/inventory?userId=${id}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setInventory(data); // Store inventory in state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log("inventory", inventory);
  
  useEffect(() => {
    fetchInventory();
  }, [id]);

  const handleClick = (id) => {
    if (!id) return;

    navigate(`/projects/${id}`);
  };

  const inventoryData = [
    {
      label: "Total Credits",
      value: inventory ? inventory.totalCreditNumber : 0,
    },
    {
      label: "Total Value",
      value: inventory ? inventory.totalPrice : 0,
    },
    {
      label: "Available Credits",
      value: inventory
        ? inventory.totalCreditNumber - inventory.usedCreditNumber
        : 0,
    },
    {
      label: "Used Credits",
      value: inventory ? inventory.usedCreditNumber : 0,
    },
  ];

  const carbonCreditData = inventory?.projects;

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="px-20 py-10">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Your Carbon Credit Inventory
      </h1>

      <Card sx={{ px: 10 }} className="!rounded-lg">
        <CardHeader
          title="Inventory Summary"
          sx={{
            ".MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        />

        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {inventoryData.map((item, index) => (
              <div key={index} className="space-y-2">
                <p className="text-textColor">{item.label}</p>
                <p
                  className={`text-2xl font-bold ${
                    item.label === "Available Credits"
                      ? "text-green-500"
                      : item.label === "Used Credits"
                        ? "text-red-500"
                        : ""
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {carbonCreditData.map((item) => (
          <Card
            sx={{ px: 1 }}
            className="cursor-pointer !rounded-lg"
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <CardHeader
              title={item.name}
              sx={{
                ".MuiCardHeader-title": {
                  fontWeight: "bold",
                  fontSize: 24,
                  p: 0,
                },
              }}
            />
            <div className="flex items-center justify-between px-4">
              <Chip label="Carbon Offsetting" size="small" />
              <p className="text-xs text-textColor">Purchased: 2023-06-15</p>
            </div>

            <CardContent className="!space-y-4">
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <CarbonIcon sx={{}} />
                  <p>{item.credits} Credits</p>
                </div>
                <p>
                  <span className="text-green-500">$ </span>
                  {item.totalPrice.replace("$", "")}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Status:</p>
                <div className="flex gap-1">
                  {item.status ? (
                    <>
                      <TickIcon sx={{ color: "green" }} />
                      <p className="text-green-500">Available</p>
                    </>
                  ) : (
                    <>
                      <CloseIcon sx={{ color: "red " }} />
                      <p className="text-red-500">Used</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CarbonCreditInventory;
