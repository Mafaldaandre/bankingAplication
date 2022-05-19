const { all, byId, remove } = require("./account");
const { makeIncreaseTransaction } = require("./account")

const calcInterest = async (user) => {
    let allAccounts = await all(user);
    const baseAccount = await byId(user.account);
    allAccounts = allAccounts.filter(account => account._id !== baseAccount._id);

    allAccounts.forEach(account => {
        let { openingDate, balance,  accountInfo: {term, interestRate}  } = account;
        openingDate = new Date(openingDate);
        openingDate.setDate(openingDate.getDate() + parseInt(term))

        if (openingDate.getTime() < new Date().getTime()) {
            const interrest = (balance * interestRate) / 100; // supostamente
            makeIncreaseTransaction(baseAccount._id, baseAccount.balance, user._id, (interrest + balance), baseAccount.iban, { description: "Interest" });
            remove(account._id);
        }

    });

    return account;
};

module.exports = { calcInterest }