const { remove } = require("../../../repositories/accountType");

module.exports = async (req, res) => {
    const { id } = req.params;
    await remove(id);

    return res.redirect('/manager/home');
};