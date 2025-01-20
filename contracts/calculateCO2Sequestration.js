function calculateCarbonSequestration(dataArray) {
    // Constants for sequestration calculations (example coefficients)
    const soilCarbonFactor = 0.45;  // Factor for soil carbon content
    const biomassFactor = 0.35;     // Factor for biomass growth
    const leafAreaFactor = 0.20;    // Factor for leaf area index

    let totalSequestered = 0;
    let totalEmissions = 0;
    let totalCarbonCredits = 0;

    dataArray.forEach(data => {
        // Extract necessary data
        const {
            Soil_Carbon_Content,
            Biomass_Growth,
            Leaf_Area_Index,
            CO2_Flux,
            Methane,
            Nitrous_Oxide
        } = data;

        // Calculate carbon sequestration (simplified formula)
        const carbonSequestered = (
            (Soil_Carbon_Content * soilCarbonFactor) +
            (Biomass_Growth * biomassFactor * 1000) +  // Biomass is in tons, convert to kg
            (Leaf_Area_Index * leafAreaFactor * 1000)
        );

        // Calculate emissions based on greenhouse gases (CO2e conversion)
        const methaneToCO2e = Methane * 25;   // Methane has 25x impact of CO2
        const nitrousOxideToCO2e = Nitrous_Oxide * 298;  // N2O has 298x impact of CO2
        const emissions = CO2_Flux + methaneToCO2e + nitrousOxideToCO2e;

        // Net sequestration (carbon captured minus emissions)
        const netSequestration = carbonSequestered - emissions;

        // Convert net sequestration to carbon credits (1 metric ton = 1 credit)
        const carbonCredits = Math.max(netSequestration / 1000, 0);  // Convert kg to tons

        totalSequestered += carbonSequestered;
        totalEmissions += emissions;
        totalCarbonCredits += carbonCredits;
    });

    const averageSequestration = totalSequestered / dataArray.length;
    const averageEmissions = totalEmissions / dataArray.length;
    const averageCredits = totalCarbonCredits / dataArray.length;

    return {
        totalSequestered,
        totalEmissions,
        totalCarbonCredits,
        averageSequestration,
        averageEmissions,
        averageCredits
    };
}
