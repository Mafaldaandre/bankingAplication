const { byId } = require("../../../repositories/accountType");

module.exports = async (req, res) => {
    const { id } = req.params;
    const accountType = await byId(id);
    const { user } = req.session;

    return res.render('manager/accountType/detail', { accountType, layout:'manager', user });
};