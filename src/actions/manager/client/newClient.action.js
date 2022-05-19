const { byId } = require("../../../repositories/users");

module.exports = async (req, res) => {
    const { id } = req.params;

    if (id !== 'add') {
        const client = await byId(id);
        return res.render('manager/client/newclient', { client,  layout:'manager', user:req.session.user });
    };

    return res.render('manager/client/newClient',  { layout:'manager', user:req.session.user});
};