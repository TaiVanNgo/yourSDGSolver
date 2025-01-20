import {
  TableHead,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { cashewTreeData } from "../data/data";

const DataTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell align="center">Temperature (°C)</TableCell>
            <TableCell align="center">Humidity (%)</TableCell>
            <TableCell align="center">Soil Moisture (%)</TableCell>
            <TableCell align="center">Precipitation (mm)</TableCell>
            <TableCell align="center">Soil Carbon Content (g/kg)</TableCell>
            <TableCell align="center">Biomass Growth (kg)</TableCell>
            <TableCell align="center">Leaf Area Index (LAI)</TableCell>
            <TableCell align="center">CO₂ Flux (g/m²/day)</TableCell>
            <TableCell align="center">Methane (ppm)</TableCell>
            <TableCell align="center">Nitrous Oxide (ppm)</TableCell>
            <TableCell align="center">Baseline Conditions (kg C)</TableCell>
            <TableCell align="center">Root Biomass (kg)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cashewTreeData.map((row) => (
            <TableRow key={row.day}>
              <TableCell>{row.day}</TableCell>
              <TableCell align="center">{row.temperature}</TableCell>
              <TableCell align="center">{row.humidity}</TableCell>
              <TableCell align="center">{row.soilMoisture}</TableCell>
              <TableCell align="center">{row.precipitation}</TableCell>
              <TableCell align="center">{row.soilCarbonContent}</TableCell>
              <TableCell align="center">{row.biomassGrowth}</TableCell>
              <TableCell align="center">{row.leafAreaIndex}</TableCell>
              <TableCell align="center">{row.co2Flux}</TableCell>
              <TableCell align="center">{row.methane}</TableCell>
              <TableCell align="center">{row.nitrousOxide}</TableCell>
              <TableCell align="center">{row.baselineConditions}</TableCell>
              <TableCell align="center">{row.rootBiomass}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
