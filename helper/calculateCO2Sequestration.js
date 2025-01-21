// Data provided by the user
const dataArray = [
    { Soil_Carbon_Content: 15.6, Biomass_Growth: 0.003, Leaf_Area_Index: 1.2, CO2_Flux: -12.4, Methane: 1.82, Nitrous_Oxide: 0.05 },
    { Soil_Carbon_Content: 15.7, Biomass_Growth: 0.004, Leaf_Area_Index: 1.3, CO2_Flux: -13.0, Methane: 1.81, Nitrous_Oxide: 0.05 },
    { Soil_Carbon_Content: 15.8, Biomass_Growth: 0.005, Leaf_Area_Index: 1.35, CO2_Flux: -13.2, Methane: 1.79, Nitrous_Oxide: 0.06 },
    { Soil_Carbon_Content: 15.9, Biomass_Growth: 0.006, Leaf_Area_Index: 1.4, CO2_Flux: -13.5, Methane: 1.78, Nitrous_Oxide: 0.05 },
    { Soil_Carbon_Content: 16.0, Biomass_Growth: 0.008, Leaf_Area_Index: 1.5, CO2_Flux: -14.0, Methane: 1.76, Nitrous_Oxide: 0.04 },
    { Soil_Carbon_Content: 16.1, Biomass_Growth: 0.009, Leaf_Area_Index: 1.55, CO2_Flux: -14.2, Methane: 1.74, Nitrous_Oxide: 0.04 },
    { Soil_Carbon_Content: 16.2, Biomass_Growth: 0.01, Leaf_Area_Index: 1.6, CO2_Flux: -14.5, Methane: 1.72, Nitrous_Oxide: 0.05 },
    { Soil_Carbon_Content: 16.3, Biomass_Growth: 0.012, Leaf_Area_Index: 1.65, CO2_Flux: -14.8, Methane: 1.71, Nitrous_Oxide: 0.04 },
    { Soil_Carbon_Content: 16.4, Biomass_Growth: 0.013, Leaf_Area_Index: 1.7, CO2_Flux: -15.0, Methane: 1.7, Nitrous_Oxide: 0.04 },
];

// Fixed implementation of the carbon sequestration function based on Verra standards
function calculateCarbonSequestrationVerra(dataArray) {
    // Constants
    const GWP_CH4 = 25; // Global Warming Potential for Methane (CO2e per ton of methane)
    const GWP_N2O = 298; // Global Warming Potential for Nitrous Oxide (CO2e per ton of nitrous oxide)
    const carbonFractionBiomass = 0.5; // 50% of biomass is carbon
    const carbonContentSoilFactor = 0.0015; // Daily carbon fraction in soil, scale based on your use case
    const biomassToCO2Factor = 44 / 12; // Conversion factor from biomass carbon to CO2 equivalent

    // Initialize result variables
    let totalSequestered = 0;
    let totalEmissions = 0;
    let totalCarbonCredits = 0;

    // Process each day's data
    dataArray.forEach((data) => {
        const {
            Soil_Carbon_Content,
            Biomass_Growth,
            Leaf_Area_Index,
            CO2_Flux,
            Methane,
            Nitrous_Oxide,
        } = data;

        // Validate data values
        if (isNaN(Soil_Carbon_Content) || isNaN(Biomass_Growth) || isNaN(Leaf_Area_Index) || isNaN(CO2_Flux) || isNaN(Methane) || isNaN(Nitrous_Oxide)) {
            console.error("Invalid data entry found, skipping this entry");
            return;
        }

        // Calculate carbon sequestration components
        const soilCarbonSequestration = Soil_Carbon_Content * carbonContentSoilFactor * 1000; // kg CO2e from soil (assuming input is in tons)
        const biomassCarbonSequestration = Biomass_Growth * carbonFractionBiomass * 1000 * biomassToCO2Factor; // kg CO2e from biomass (converted from tons to kg)
        const leafAreaCarbonSequestration = Leaf_Area_Index * carbonFractionBiomass * 1000 * biomassToCO2Factor; // kg CO2e from leaves (assuming biomass factor)

        const totalCarbonSequestration = soilCarbonSequestration + biomassCarbonSequestration + leafAreaCarbonSequestration;

        // Calculate greenhouse gas emissions in CO2e
        const methaneToCO2e = Methane * GWP_CH4; // Methane emissions converted to CO2e
        const nitrousOxideToCO2e = Nitrous_Oxide * GWP_N2O; // Nitrous Oxide emissions converted to CO2e
        const totalGasEmissions = methaneToCO2e + nitrousOxideToCO2e;
        const emissions = CO2_Flux + totalGasEmissions; // Total emissions in CO2e

        // Net sequestration (sequestration - emissions)
        const netSequestration = totalCarbonSequestration - emissions;

        // Convert to carbon credits (VCUs) and ensure non-negative
        const carbonCredits = Math.max(netSequestration / 1000, 0); // kg → tons (carbon credits in tons)

        // Aggregate results
        totalSequestered += totalCarbonSequestration;
        totalEmissions += emissions;
        totalCarbonCredits += carbonCredits;
    });

    // Compute averages
    const averageSequestration = totalSequestered / dataArray.length;
    const averageEmissions = totalEmissions / dataArray.length;
    const averageCredits = totalCarbonCredits / dataArray.length;

    // Return consolidated results
    return {
        totalSequestered,
        totalEmissions,
        totalCarbonCredits,
        averageSequestration,
        averageEmissions,
        averageCredits,
    };
}

// Run the updated function and log the results
const results = calculateCarbonSequestrationVerra(dataArray);
console.log(results);
