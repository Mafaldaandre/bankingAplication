const { createUserClientManager, updateUserManager } = require("../../../repositories/users");

module.exports = async (req, res) => {

    let { id } = req.params;
    const {  name, email, address, phone, work, nif  } = req.body;
    const { user } = req.session;

    if(!name || !email || !address || !phone || !work || !nif){
        res.redirect('/404');
        return;
    }

    if (id === 'add') {
        const client = await createUserClientManager(name, email, address, phone, work, nif, user);
        id = client.id;
        return res.render('manager/client/clientSuccess', { layout:'manager', user});

    } else {
        await updateUserManager(id, name, email, address, phone, work, nif, user);  
        
    };
    
    return res.redirect(`/manager/client/clientList/${id}`);
};