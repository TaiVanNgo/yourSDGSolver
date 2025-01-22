import {
  weatherSeriesData,
  xAxisData,
  baselineComparisonSeriesData,
  plantGrowthSeriesData,
  carbonGreenhouseSeriesData,
} from "../data/data";
import ChartCard from "../components/ChartCard";
import { Card, CardContent, CardHeader } from "@mui/material";
import { default as TreeIcon } from "@mui/icons-material/ParkOutlined";
import { default as TrendIcon } from "@mui/icons-material/TrendingUpOutlined";
import { default as CarbonIcon } from "@mui/icons-material/Co2Outlined";
import { default as MoneyIcon } from "@mui/icons-material/AttachMoneyOutlined";
import { BarChart } from "@mui/x-charts";

const FarmerData = [
  {
    title: "Farm Area",
    content: "2 hectares",
    icon: <TreeIcon />,
  },
  {
    title: "Cashew Output",
    content: "6,000 kg/year",
    icon: <TrendIcon />,
  },
  {
    title: "Carbon Credits Sold",
    content: "30 credits",
    icon: <CarbonIcon />,
  },
  {
    title: "Carbon Credits Revenue",
    content: "$ 210",
    icon: <MoneyIcon />,
  },
];

const FarmerDashboard = () => {
  return (
    <div className="w-full p-8">
      <h1 className="mb-10 text-center text-3xl font-extrabold">
        Farmer Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-x-10">
        {FarmerData.map((item, index) => (
          <Card className="!mb-8 !rounded-lg !px-8 !pt-6" key={index}>
            <div className="flex justify-between">
              <p className="items-center text-lg font-bold">{item.title}</p>
              {item.icon}
            </div>

            <CardContent sx={{ p: 0 }}>
              <p className="mt-4 text-2xl font-extrabold">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8 px-32">
        <Card className="!px-8 !pt-4">
          <p className="text-3xl font-bold">Monthly Profit</p>
          <p className="text-textColor">
            Overview of your farm&apos;s monthly profit
          </p>
          <CardContent>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
              ]}
              series={[
                {
                  data: [150, 180, 160, 250, 300, 320],
                  name: "Profit (USD)",
                },
              ]}
              fullWidth
              height={300}
              legend={{ position: "bottom" }}
              grid={{ horizontal: true }}
            />
          </CardContent>
        </Card>
      </div>

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
