function calculateCarbonCredits(soilCarbonContent, biomassGrowth, co2Flux) {
    const carbonCredits = soilCarbonContent * biomassGrowth * co2Flux;
    return carbonCredits;
}
