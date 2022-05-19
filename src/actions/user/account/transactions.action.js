const { byId } = require("../../../repositories/account");
const { remove } = require("../../../repositories/account");
const { makeIncreaseTransaction, makeDecreaseTransaction } = require("../../../repositories/account");

const transactionsReforce = async (req, res) => {
    const { id } = req.params;
    const account = await byId(id);
    const { montante } = req.body;
    const { user } = req.session;
    if (montante && montante > 0) {
        const poupanceAccount = await byId(id);
        const pAccount = await byId(user.account);
        if (montante <= pAccount.balance) {
            makeDecreaseTransaction(pAccount._id, pAccount.balance, user._id, parseFloat(montante), pAccount.iban);
            makeIncreaseTransaction(id, poupanceAccount.balance, user._id, parseFloat(montante), poupanceAccount.iban);
        }
        return res.render('user/account/transfers/success', { layout: 'user', user: req.session.user });
    };
    res.render('user/account/transfers/reforce', { layout: 'user', user: req.session.user, account });
};
const transactionsLiquidation = async (req, res) => {
    const { id } = req.params;
    const { montante } = req.body;
    const { user } = req.session;
    if (montante && montante > 0) {
        const poupanceAccount = await byId(id);
        const pAccount = await byId(user.account);
        
        if (montante <= poupanceAccount.balance) {
            makeIncreaseTransaction(pAccount._id, pAccount.balance, user._id, parseFloat(montante), pAccount.iban);
            makeDecreaseTransaction(id, poupanceAccount.balance, user._id, parseFloat(montante), poupanceAccount.iban);
            if (montante == poupanceAccount.balance) {
                remove(poupanceAccount._id);
            }
        }
          
        return res.render('user/account/transfers/success', { layout: 'user', user: req.session.user });   
    };
    res.render('user/account/transfers/liquidation', { layout: 'user', user: req.session.user, account });
};
const transactionsNacional = async (req, res) => {
    const account = await byId(req.session.user.account)
    res.render('user/account/transfers/nationals', { layout: 'user', user: req.session.user, account });
};
const transactionsInternational = async (_, res) => {
    const account = await byId(_.session.user.account)
    res.render('user/account/transfers/international', { layout: 'user', user: _.session.user, account });
};
const createNewTransactionNational = async (req, res) => {
    const { exit, iban, name, description } = req.body;
    const { user } = req.session;
    if (!exit || !iban || !name || !description) { 
        res.redirect('/404');
        return;
    };  
        const account = await byId(user.account);
        if (account.balance >= exit) {
            await makeDecreaseTransaction(account._id, account.balance, user._id, parseFloat(exit), iban, {description})        
            return res.render('user/account/transfers/success', { layout: 'user', user: req.session.user });
        }
    
    return res.render('404');
};
const createNewTransactionInternational = async (req, res) => {
    const { country, name, exit, description, iban, clearingCode, bicSwift, bank, bankAddress } = req.body;
    const { user } = req.session;
    if (!country || !name || !exit || !iban || !clearingCode || !bicSwift || !description || !bank || !bankAddress || !iban) {
        res.redirect('/404');
        return;
    };
    const account = await byId(req.session.user.account);
    
   if (account.balance >= exit) {
       await makeDecreaseTransaction(account._id, account.balance, user._id, parseFloat(exit), iban, {
           country,
           description,
           bicSwift,
           bank,
           bankAddress
       })        
       return res.render('user/account/transfers/success', { layout: 'user', user: req.session.user });
    }
    return res.render('404'); 
};

module.exports = { transactionsNacional, createNewTransactionNational, transactionsInternational, createNewTransactionInternational, transactionsReforce, transactionsLiquidation }; 