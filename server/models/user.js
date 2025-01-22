const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const UserSchema = new Schema({
    name: {
        type: String
    },
    coordinate: {
        type: String,
        validate: {
            validator: function (v) {
                return /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(v);
            },
            message: props => `${props.value} is not a valid coordinate format!`
        }
    },
    walletAddress: {
        type: String
    },
    role: {
        type: String,
        default: "buyer",
        enum: ["buyer", "seller"]
    }
});

module.exports = Mongoose.model('User', UserSchema);