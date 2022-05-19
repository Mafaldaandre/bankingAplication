const { updateUser } = require("../../repositories/users");

const profile = async (req, res) =>  {
    res.render('user/profile', { layout:'user', user:req.session.user });
};

const updateProfile = async (req, res) => {
    const { user } = req.session;
    const { name, email, password, address, phone, office, nif} = req.body;

    const updatedUser = await updateUser(user._id, name, email, password, address, phone, office, nif);
    req.session.user = updatedUser;
    
    return res.redirect('/manager/home');
  
};

module.exports = { profile, updateProfile }; 

