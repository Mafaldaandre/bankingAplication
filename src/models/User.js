const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    email: String,
    type: Number,
    address: String,
    phone: String,
    office: String,
    work: String,
    nif: String,
    password: String, 
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    manager: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('User', UserSchema);