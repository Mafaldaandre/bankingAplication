const { byId } = require("../../../repositories/accountType");
const { create } = require("../../../repositories/account");
const { createUserClient, updateAccountUser } = require("../../../repositories/users");

const loadForm = async (req, res) => {
    const { id } = req.params;
    const { user } = req.session;
    const accountType = await byId(id);
    let layout = user ? "user" : 'main';
    return res.render('user/register_accountType', { accountType, user, layout });
;}

const createAccount = async (req, res) => {
    const { id } = req.params;  
    let { user } = req.session;
    const accountType = await byId(id);
    const { name, email, password, address, phone, work, nif } = req.body; 
    if (accountType) {

        if (user) {
            await create(0, accountType, user);
            return res.render('create', { layout: 'user', user });
        }else{
            user = await createUserClient(name, email, password, address, phone, work, nif);
            const account = await create(0, accountType, user);
            updateAccountUser(user._id, account);
            return res.redirect('/auth/login');
        }
    };
    
        return res.render('404', { layout: 'user' });
  
};

module.exports = { loadForm, createAccount }