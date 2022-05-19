const { all } = require("../../../repositories/users");

module.exports = async (req, res) => {
    const { filter } = req.query;
    const { user } = req.session;
    const clients = await all(user, filter);

    return res.render('manager/client/clientList', { clients, layout:'manager', user });
};