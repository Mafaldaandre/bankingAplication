const { Schema, model } = require('mongoose');

const TransactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    date: Date ,
    exit: Number,
    name: String,
    iban: String,
    description: String,
    country: String,
    entrance: Number,
    clearingCode: String,
    bicSwift:String,
    bank: String,
    bankAddress: String,
    charges: String
});

module.exports = model('Transaction', TransactionSchema);