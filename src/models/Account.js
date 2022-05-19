const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
    openingDate: Date,
    closingDate: Date,
    iban: String,
    balance: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    accountType: { type: Schema.Types.ObjectId, ref: 'AccountType' }
});

module.exports = model('Account', AccountSchema);