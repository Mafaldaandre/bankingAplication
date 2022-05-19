const { byId } = require("../../../repositories/accountType");

module.exports = async (req, res) => {
    const { id } = req.params;
    const { user } = req.session;

    if (id !== 'add') {
        const accountType = await byId(id);
        return res.render('manager/accountType/form', { accountType, layout:'manager' });
    };

    return res.render('manager/accountType/form',  { layout:'manager', user });
};