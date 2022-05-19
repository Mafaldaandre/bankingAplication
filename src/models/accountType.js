const { Schema, model } = require('mongoose');

const AccountTypeSchema = new Schema({
    name:String,
    description: String,
    interestRate: String,
    createDate: Date,
    term: String,
    private: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    locked: Boolean
});

module.exports = model('AccountType', AccountTypeSchema);