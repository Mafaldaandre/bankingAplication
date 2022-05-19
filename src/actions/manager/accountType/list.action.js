const { all } = require("../../../repositories/accountType");

module.exports = async (req, res) => {
    const { filter } = req.query;
    const { user } = req.session;
    const accountsType = await all(user, filter);
    return res.render('manager/accountType/list', { accountsType, layout:'manager', user });
};