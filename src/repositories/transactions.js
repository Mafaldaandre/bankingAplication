const Transactions = require('../models/Transactions');

const byId = async (id) => Transactions.findById(id).lean();

const createTransaction = async (userId, accountId, exit, iban, name, description, entrance, international) => {

    return Transactions.create({ 
        user: userId ,
        account: accountId,
        date: new Date(),
        exit,
        name,
        iban,
        description, 
        entrance, 
        ...international
    });
};

const all = async (user, filter) => {
    let filterData = { user , account: filter}; // { user,  account: filter};

    return Transactions.find(filterData).lean();
};

module.exports = { createTransaction, byId, all };