const { byId } = require("../../../repositories/users");
const { makeIncreaseTransaction } =require("../../../repositories/account");
const { byId: getAccount } = require("../../../repositories/account");

module.exports = async (req, res) => {
    const { id } = req.params;
    const client = await byId(id);
    const { montante } = req.body;

    if (montante) {
        const account = await getAccount(client.account);
        makeIncreaseTransaction (client.account, account.balance, id, montante, client.account.iban, { description: "Depósito" });

        return res.render('manager/addDeposit', { layout: 'manager', user:req.session.user });
    }

    return res.render('manager/client/clientDetail', { client, layout:'manager', user:req.session.user });
};  