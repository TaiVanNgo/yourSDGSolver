const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  projectType: { type: String, required: true },
  title: { type: String, required: true },
  countryFlag: { type: String, required: true },
  countryName: { type: String, required: true },
  price: { type: String, required: true },
  sdg: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  annualEmissionReduction: { type: String, required: true },
  technologyType: { type: String, required: true },
  projectStatus: { type: String, required: true },
  verificationStandard: { type: String, required: true },
  startDate: { type: String, required: true },
  environmentalImpact: {
    keyBenefits: { type: [String], required: true },
    description: { type: String, required: true },
  },
  socialAndEconomicBenefits: {
    jobCreation: { type: String, required: true },
    energyAccess: { type: String, required: true },
    economicGrowth: { type: String, required: true },
    infrastructure: { type: String, required: true },
  },
  coordinate: { type: String, required: true },
  walletAddress: { type: String, required: true },
  availableCarbonCredits: { type: Number, required: true },
});

module.exports = mongoose.model("Project", ProjectSchema);
