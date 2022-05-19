const { Schema, model } = require('mongoose');

const UserTypeSchema = new Schema({
    description: String
});

module.exports = model('UserType', UserTypeSchema);