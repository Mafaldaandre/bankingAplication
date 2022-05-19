const { remove } = require("../../../repositories/users");

module.exports = async (req, res) => {
    const { id } = req.params;
    await remove(id);

    return res.redirect('/client/manager/clientList');
};