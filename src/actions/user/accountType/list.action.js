const { all } = require("../../../repositories/accountType");

module.exports = async (req, res) => {
    const { filter } = req.query;
    const { user } = req.session;
    let layout = user ? "user" :  'main';
    const accountsType = await all(user, filter);
    return res.render('user/accountType/list', { accountsType, user, layout });
};