import { ControlCameraSharp } from "@mui/icons-material";
import {
  TableCell,
  Typography,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useEffect } from "react";

const TableDetails = () => {
  const { transactionId } = useParams();
  console.log(transactionId);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/transaction/view/id/${transactionId}`,
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const transactData = data.asset.data.data;
        setData(transactData); // Store the fetched data in state
      } catch (err) {
        setError(err.message);
        console.error("Error fetching transaction data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [transactionId]); // Fetch data whenever transactionId changes

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  const rows = [
    { label: "Project ID", value: data.Project_ID },
    { label: "Family ID", value: data.Family_ID },
    { label: "Date", value: data.Date },
    { label: "Temperature (°C)", value: data.Temperature },
    { label: "Humidity (%)", value: data.Humidity },
    { label: "Soil Moisture (%)", value: data.Soil_Moisture },
    { label: "Precipitation (mm)", value: data.Precipitation },
    { label: "Soil Carbon Content (g/kg)", value: data.Soil_Carbon_Content },
    { label: "Biomass Growth (kg)", value: data.Biomass_Growth },
    { label: "Leaf Area Index (LAI)", value: data.Leaf_Area_Index },
    { label: "CO₂ Flux (g/m²/day)", value: data.CO2_Flux },
    { label: "Methane (ppm)", value: data.Methane },
    { label: "Nitrous Oxide (ppm)", value: data.Nitrous_Oxide },
    { label: "GPS Coordinates", value: data.GPS_Coordinates },
    { label: "Baseline Conditions (kg C)", value: data.Baseline_Conditions },
    { label: "Root Biomass (kg)", value: data.Root_Biomass },
    { label: "Verification Status", value: data.Verification_Status },
    { label: "Measurement Method", value: data.Measurement_Method },
    {
      label: "Carbon Credits Earned (VCUs)",
      value: data["Carbon_Credits_Earned (VCUs)"],
    },
  ];

  return (
    <div className="p-8 px-32">
      <Typography variant="h4" gutterBottom>
        Detail Page for {data.Date}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={2}>
                <Typography variant="h6">Details</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  {row.label}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TableDetails;
