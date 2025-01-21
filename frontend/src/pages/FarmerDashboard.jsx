import {
  weatherSeriesData,
  xAxisData,
  baselineComparisonSeriesData,
  plantGrowthSeriesData,
  carbonGreenhouseSeriesData,
} from "../data/data";
import ChartCard from "../components/ChartCard";
import { Card, CardHeader } from "@mui/material";

const FarmerDashboard = () => {
  return (
    <div className="w-full p-8">
      <h1 className="mb-10 text-center text-3xl font-extrabold">
        Farmer Dashboard
      </h1>

      <Card className="!mb-8 !rounded-lg !p-8">
        <CardHeader
          title="Estimated Carbon Credits"
          subheader="Based on current data and projections"
          className="!mb-2 !p-0 !text-5xl"
        />

        <h2 className="mb-2 text-4xl font-bold text-green-600">100 Credits</h2>
        <p className="text-sm text-[#00000099]">Estimated value: $5000</p>
      </Card>

      <div className="grid grid-cols-2 gap-10">
        <ChartCard
          title="Weather Metrics"
          subheader="Temperature, Humidity, Precipitation, and Soil Moisture"
          xAxisData={xAxisData}
          seriesData={weatherSeriesData}
        />

        <ChartCard
          title="Plant Growth Metrics"
          subheader="Biomass Growth, Leaf Area Index (LAI), and Root Biomass"
          xAxisData={xAxisData}
          seriesData={plantGrowthSeriesData}
        />

        <ChartCard
          title="Carbon and Greenhouse Gases"
          subheader="Soil Carbon Content, CO₂ Flux, Methane, and Nitrous Oxide"
          xAxisData={xAxisData}
          seriesData={carbonGreenhouseSeriesData}
        />

        <ChartCard
          title="Baseline Comparison"
          subheader="Baseline Conditions (kg C) and Root Biomass"
          xAxisData={xAxisData}
          seriesData={baselineComparisonSeriesData}
        />
      </div>
    </div>
  );
};
export default FarmerDashboard;
