const { byId } = require("../../../repositories/account");
const { all } = require("../../../repositories/transactions");

module.exports = async (_, res) => {
    const { id } = _.params;
    const { user } = _.session;
    const account = await byId(id);
    let transactions = await all(user, id);

    transactions.map(trans => {
        const date = new Date(trans.date); 
        trans.date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return trans;
    });

    if(account){
        return res.render('user/account/details', { layout:'user', user:_.session.user, account, transactions });
    };

    return res.render('404');
};