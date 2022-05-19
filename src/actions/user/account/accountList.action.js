const { all, byId, remove } = require("../../../repositories/account");

const getAllAccounts = async (req, res) => {
    const { user } = req.session;
    
    let accounts = await all(user);

    return res.render('user/account/list', { accounts, user, layout:'user'});
};

const removed = async (req, res) => {
    const { id } = req.params;
    const account = await byId(id)
    
    if (account.balance == 0) {
        await remove(id); 
        return res.redirect('/user/home');
    }

    return res.render('user/account/errorDelete', {layout:'user', user:req.session.user});
};

module.exports = {getAllAccounts, removed};