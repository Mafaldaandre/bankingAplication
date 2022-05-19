const Account = require('../models/Account');
const { byId: accountTypeById } = require("../repositories/accountType");
const { createTransaction } = require("./transactions");

const generateIban = () => {
    const prefix = 'PT50'
    const number = Math.floor(123456789056070908040 + Math.random() * 123456789056070908040);
    return prefix + number ;
};

const byId = async (id) => {
    let account = await Account.findById(id).lean();
    const type = await accountTypeById(account.accountType)
    account = {
        ...account, 
        accountInfo: type
    }
    return account;
};

const create = async (balance, accountType, user) => {
    return Account.create({ 
        openingDate: new Date(),
        iban: generateIban(),
        balance,
        user: user._id,
        accountType: accountType._id
    });
};

const all = async (user, filter) => {
    let filterData = { user };
    
    if (filter) {
        filterData = {
            name: {
                $regex: `.*${filter}.*`,
                $options: 'i'
            }
        };
    }
    let accounts = await Account.find(filterData).lean();
    let p = 0;
   
    for (account of accounts) {
        const type = await accountTypeById(account.accountType)
        accounts[p] =
        {
            ...account,
            accountInfo: type
        };
        p++;
    }
    return accounts;
};

const updateBalance = async (id, balance) => {
    const { openingDate, closingDate , iban, user, accountType } = await Account.findById(id);
    return Account.findByIdAndUpdate(id, {
        $set: { openingDate, closingDate, iban, user, accountType, balance }
    });
};

const allByAccountType = async (user, accountType) => {
    let filterData = {user, accountType};
    return Account.find(filterData).lean();
};

const remove = async (id) => {
    const account = await Account.findById(id);
    
    return account.remove();
};

const makeIncreaseTransaction = (accountId, oldBalance, userAccount, montante, iban, extraInfo = null) => {
    makeTransaction(accountId, oldBalance + parseFloat(montante), userAccount, 0, iban, parseFloat(montante), extraInfo);
};

const makeDecreaseTransaction = (accountId, oldBalance, userAccount, montante, iban, extraInfo = null) => {
    makeTransaction(accountId, oldBalance - parseFloat(montante), userAccount, parseFloat(montante), iban, 0, extraInfo);
};

const makeTransaction = (accountId, balance, userId, exit = 0, iban, entrance = 0, international) => {
    updateBalance(accountId, balance); 
    createTransaction(userId, accountId, exit, iban, 'Poupança', 'Poupança', entrance, international);
};


module.exports = { create, byId, all , allByAccountType, remove, updateBalance, makeIncreaseTransaction, makeDecreaseTransaction}; 