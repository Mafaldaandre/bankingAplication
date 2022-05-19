const {  createUserManager } = require("../../repositories/users");

const register = async (_, res) => {
    res.render('manager/register', { layout: false, message: undefined });
}

const createRegister = async (req, res) => {
    const { name, office, email, password, address, phone, nif } = req.body;

    if(!name || !email || !password || !address || !phone || !office || !nif){
        res.redirect('/404');
        return;
    };

    await createUserManager(name, office, email, password, address, phone, nif);
    
    res.redirect('/auth/login');
};

module.exports = { register, createRegister }; 