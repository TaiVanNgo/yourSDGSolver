const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const TransactionSchema = new Schema({
    transactionID: {
        type: String
    }
});

module.exports = Mongoose.model('Transaction', TransactionSchema);