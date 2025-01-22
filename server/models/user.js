const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  walletAddress: {
    type: String,
  },
  role: {
    type: String,
    default: "buyer",
    enum: ["buyer", "seller"],
  },
});

module.exports = Mongoose.model("User", UserSchema);
