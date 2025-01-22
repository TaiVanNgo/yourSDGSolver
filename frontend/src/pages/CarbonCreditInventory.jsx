import { Card, CardContent, CardHeader, Chip } from "@mui/material";
import { default as CarbonIcon } from "@mui/icons-material/Co2Outlined";
import { default as TickIcon } from "@mui/icons-material/DoneOutlined";
import { default as CloseIcon } from "@mui/icons-material/CloseOutlined";
import { useNavigate } from "react-router-dom";

const inventoryData = [
  {
    label: "Total Credits",
    value: "10",
  },
  {
    label: "Total Value",
    value: "$225.00",
  },
  {
    label: "Available Credits",
    value: "7",
  },
  {
    label: "Used Credits",
    value: "3",
  },
];

const carbonCreditData = [
  {
    id: 5,
    title: "Co Tham Hat Dieu",
    credits: 10,
    price: 50,
    status: true,
  },
  {
    id: 4,
    title: "Dieu Nha Chu Tam",
    credits: 3,
    price: 15,
    status: false,
  },
  {
    id: 1,
    title: "Trai Dieu Tong Hop",
    credits: 8,
    price: 64,
    status: true,
  },
  {
    id: 2,
    title: "Dieu Thay Phuoc",
    credits: 8,
    price: 64,
    status: false,
  },
];

const CarbonCreditInventory = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (!id) return;

    navigate(`/projects/${id}`);
  };

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
        {carbonCreditData.map((item, index) => (
          <Card
            sx={{ px: 1 }}
            className="cursor-pointer !rounded-lg"
            key={index}
            onClick={() => handleClick(item.id)}
          >
            <CardHeader
              title={item.title}
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
                  <p>5 Credits</p>
                </div>
                <p>
                  <span className="text-green-500">$</span>
                  {item.price}
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
