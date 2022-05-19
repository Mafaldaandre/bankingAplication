 const { create, update } = require("../../../repositories/accountType");

module.exports = async (req, res) => {
    let { id } = req.params;
    const { name, description, interestRate, term, private, locked} = req.body;
    const { user } = req.session;
    if (id === 'add') {
        const accountType = await create(name, description, interestRate, user, term, private, locked);
        id = accountType.id;

        return res.render('create', { layout: 'manager', user });

    } else {
        await update(id, name,  description, interestRate, term );
        return res.render('manager/accountType/changed', { layout: 'manager', user });
    };
};

