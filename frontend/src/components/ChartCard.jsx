import { Card, CardHeader, CardContent } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const ChartCard = ({ title, subheader, xAxisData, seriesData }) => {
  return (
    <Card className="!rounded-lg">
      <CardHeader
        title={title}
        subheader={subheader}
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "black",
          marginTop: "10px",
        }}
      />

      <CardContent>
        <LineChart
          margin={{ bottom: 120 }}
          xAxis={[
            {
              data: xAxisData,
              label: "Day",
            },
          ]}
          series={seriesData}
          height={400}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: 0,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
export default ChartCard;
