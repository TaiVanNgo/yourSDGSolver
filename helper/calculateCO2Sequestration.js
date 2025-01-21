function calculateCarbonSequestrationVerra(dataArray) {
    // Constants for sequestration and emissions calculations
    const GWP_CH4 = 25; // Global Warming Potential for Methane
    const GWP_N2O = 298; // Global Warming Potential for Nitrous Oxide
    const carbonFractionBiomass = 0.5; // 50% of biomass is carbon
    const carbonContentSoilFactor = 0.0015; // Soil carbon fixed daily percentage

    let totalSequestered = 0; // Total carbon sequestered across all data points
    let totalEmissions = 0; // Total greenhouse gas emissions across all data points
    let totalCarbonCredits = 0; // Total VCUs calculated

    dataArray.forEach(data => {
        // Extract necessary data from each object in the array
        const {
            Soil_Carbon_Content, // Percentage of carbon in soil
            Biomass_Growth, // Biomass increment per day in tons/m²
            Leaf_Area_Index, // Leaf area index
            CO2_Flux, // CO2 exchange in g/m²/day
            Methane, // Methane emissions in g/m²/day
            Nitrous_Oxide // Nitrous Oxide emissions in g/m²/day
        } = data;

        // Step 1: Calculate carbon sequestration
        const soilCarbonSequestration = (Soil_Carbon_Content * carbonContentSoilFactor * 1000); // kg CO2/m²/day

        const biomassCarbonSequestration = (
            Biomass_Growth * carbonFractionBiomass * 1000 * 44 / 12
        ); // Biomass in kg CO2/m²/day

        const leafAreaCarbonSequestration = (
            Leaf_Area_Index * carbonFractionBiomass * 1000 * 44 / 12
        ); // Leaf area sequestration in kg CO2/m²/day

        const totalCarbonSequestration = soilCarbonSequestration + biomassCarbonSequestration + leafAreaCarbonSequestration;

        // Step 2: Calculate emissions in CO2e
        const methaneToCO2e = Methane * GWP_CH4; // Convert methane emissions to CO2e
        const nitrousOxideToCO2e = Nitrous_Oxide * GWP_N2O; // Convert N2O emissions to CO2e
        const totalEmissions = CO2_Flux + methaneToCO2e + nitrousOxideToCO2e;

        // Step 3: Calculate net carbon (sequestration - emissions)
        const netSequestration = totalCarbonSequestration - totalEmissions;

        // Step 4: Convert net sequestration to carbon credits (1 metric ton = 1 VCU)
        const carbonCredits = Math.max(netSequestration / 1000, 0); // Convert kg to tons, ensure non-negative credits

        // Add to totals
        totalSequestered += totalCarbonSequestration;
        totalEmissions += totalEmissions;
        totalCarbonCredits += carbonCredits;
    });

    // Calculate averages
    const averageSequestration = totalSequestered / dataArray.length;
    const averageEmissions = totalEmissions / dataArray.length;
    const averageCredits = totalCarbonCredits / dataArray.length;

    return {
        totalSequestered, // Total carbon sequestered (kg CO2)
        totalEmissions, // Total emissions (kg CO2e)
        totalCarbonCredits, // Total carbon credits earned (VCUs)
        averageSequestration, // Average sequestration per data point
        averageEmissions, // Average emissions per data point
        averageCredits // Average credits per data point
    };
}
