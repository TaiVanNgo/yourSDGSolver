export const cashewTreeData = [
  {
    day: 1,
    temperature: 30.2,
    humidity: 65,
    soilMoisture: 45.2,
    precipitation: 2.1,
    soilCarbonContent: 15.6,
    biomassGrowth: 0.003,
    leafAreaIndex: 1.2,
    co2Flux: -12.4,
    methane: 1.82,
    nitrousOxide: 0.05,
    gpsCoordinates: "10.775, 106.662",
    baselineConditions: 8.0,
    rootBiomass: 0.15,
  },
  {
    day: 2,
    temperature: 31.5,
    humidity: 68,
    soilMoisture: 46.0,
    precipitation: 0.0,
    soilCarbonContent: 15.7,
    biomassGrowth: 0.004,
    leafAreaIndex: 1.3,
    co2Flux: -13.0,
    methane: 1.81,
    nitrousOxide: 0.05,
    gpsCoordinates: "10.775, 106.662",
    baselineConditions: 8.05,
    rootBiomass: 0.16,
  },
  {
    day: 3,
    temperature: 29.8,
    humidity: 72,
    soilMoisture: 47.5,
    precipitation: 3.5,
    soilCarbonContent: 15.8,
    biomassGrowth: 0.005,
    leafAreaIndex: 1.35,
    co2Flux: -13.2,
    methane: 1.79,
    nitrousOxide: 0.06,
    gpsCoordinates: "10.775, 106.662",
    baselineConditions: 8.1,
    rootBiomass: 0.17,
  },
  {
    day: 4,
    temperature: 30.0,
    humidity: 70,
    soilMoisture: 48.1,
    precipitation: 1.2,
    soilCarbonContent: 15.9,
    biomassGrowth: 0.006,
    leafAreaIndex: 1.4,
    co2Flux: -13.5,
    methane: 1.78,
    nitrousOxide: 0.05,
    gpsCoordinates: "10.775, 106.662",
    baselineConditions: 8.15,
    rootBiomass: 0.18,
  },
  {
    day: 5,
    temperature: 32.0,
    humidity: 63,
    soilMoisture: 43.8,
    precipitation: 0.0,
    soilCarbonContent: 16.0,
    biomassGrowth: 0.008,
    leafAreaIndex: 1.5,
    co2Flux: -14.0,
    methane: 1.76,
    nitrousOxide: 0.04,
    gpsCoordinates: "10.775, 106.662",
    baselineConditions: 8.2,
    rootBiomass: 0.2,
  },
  {
    day: 6,
    temperature: 31.2,
    humidity: 67,
    soilMoisture: 44.5,
    precipitation: 0.0,
    soilCarbonContent: 16.1,
    biomassGrowth: 0.009,
    leafAreaIndex: 1.55,
    co2Flux: -14.2,
    methane: 1.74,
    nitrousOxide: 0.04,
    gpsCoordinates: "10.775, 106.662",
    baselineConditions: 8.25,
    rootBiomass: 0.22,
  },
  {
    day: 7,
    temperature: 30.5,
    humidity: 69,
    soilMoisture: 45.0,
    precipitation: 1.8,
    soilCarbonContent: 16.2,
    biomassGrowth: 0.01,
    leafAreaIndex: 1.6,
    co2Flux: -14.5,
    methane: 1.72,
    nitrousOxide: 0.05,
    gpsCoordinates: "10.775, 106.662",
    baselineConditions: 8.3,
    rootBiomass: 0.25,
  },
  {
    day: 8,
    temperature: 29.7,
    humidity: 74,
    soilMoisture: 49.0,
    precipitation: 4.3,
    soilCarbonContent: 16.3,
    biomassGrowth: 0.012,
    leafAreaIndex: 1.65,
    co2Flux: -14.8,
    methane: 1.71,
    nitrousOxide: 0.04,
    gpsCoordinates: "10.775, 106.662",
    baselineConditions: 8.35,
    rootBiomass: 0.27,
  },
  {
    day: 9,
    temperature: 30.1,
    humidity: 71,
    soilMoisture: 46.7,
    precipitation: 1.1,
    soilCarbonContent: 16.4,
    biomassGrowth: 0.013,
    leafAreaIndex: 1.7,
    co2Flux: -15.0,
    methane: 1.7,
    nitrousOxide: 0.04,
    gpsCoordinates: "10.775, 106.662",
    baselineConditions: 8.4,
    rootBiomass: 0.3,
  },
];

export const xAxisData = cashewTreeData.map((item) => item.day);

export const weatherSeriesData = [
  {
    data: cashewTreeData.map((item) => item.temperature),
    label: "Temperature (°C)",
    color: "red",
  },
  {
    data: cashewTreeData.map((item) => item.humidity),
    label: "Humidity (%)",
    color: "blue",
  },
  {
    data: cashewTreeData.map((item) => item.soilMoisture),
    label: "Soil Moisture (%)",
    color: "green",
  },
  {
    data: cashewTreeData.map((item) => item.precipitation),
    label: "Precipitation (mm)",
    color: "purple",
  },
];

export const plantGrowthSeriesData = [
  {
    data: cashewTreeData.map((item) => item.biomassGrowth),
    label: "Biomass Growth (kg)",
    color: "orange",
  },
  {
    data: cashewTreeData.map((item) => item.leafAreaIndex),
    label: "Leaf Area Index (LAI)",
    color: "teal",
  },
  {
    data: cashewTreeData.map((item) => item.rootBiomass),
    label: "Root Biomass (kg)",
    color: "brown",
  },
];

export const carbonGreenhouseSeriesData = [
  {
    data: cashewTreeData.map((item) => item.soilCarbonContent),
    label: "Soil Carbon Content (g/kg)",
    color: "darkgreen",
  },
  {
    data: cashewTreeData.map((item) => item.co2Flux),
    label: "CO₂ Flux (g/m²/day)",
    color: "gray",
  },
  {
    data: cashewTreeData.map((item) => item.methane),
    label: "Methane (CH₄) (ppm)",
    color: "cyan",
  },
  {
    data: cashewTreeData.map((item) => item.nitrousOxide),
    label: "Nitrous Oxide (N₂O) (ppm)",
    color: "pink",
  },
];

export const baselineComparisonSeriesData = [
  {
    data: cashewTreeData.map((item) => item.baselineConditions),
    label: "Baseline Conditions (kg C)",
    color: "gold",
  },
  {
    data: cashewTreeData.map((item) => item.rootBiomass),
    label: "Root Biomass (kg)",
    color: "brown",
  },
];
