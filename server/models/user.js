const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Sub-schema for Projects
const UserProjectSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const CarbonCreditSchema = new Schema(
  {
    projects: {
      type: [UserProjectSchema],
      required: true,
    },
    totalCreditNumber: {
      type: Number,
      required: true,
    },
    usedCreditNumber: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

// Main User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "buyer",
    enum: ["buyer", "seller"],
  },
  totalCredits: {
    type: Number,
  },
  carbonCredit: {
    type: CarbonCreditSchema,
  },
});

module.exports = Mongoose.model("User", UserSchema);
