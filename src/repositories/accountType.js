const AccountType = require('../models/AccountType');

const all = async (user, filter = undefined) => {

    let filterData = {};
 
    if (user) {
        if(user.type == 2) {
            filterData = { user };  
        } else {
             filterData = { private: true };
        }
    } else {
        filterData = { private: false };
    };

    if (filter) {
        filterData = {
            name: {
                $regex: `.*${filter}.*`,
                $options: 'i'
            }
        };
    };

    return AccountType.find(filterData).lean();
};

const byId = async (id) => AccountType.findById(id).lean();

const create = async (name, description, interestRate, user, term, private, locked = false) => {
    
    return AccountType.create({ 
        name, 
        description, 
        interestRate, 
        createDate : new Date(),
        term,
        private: !!private,
        user: user._id, 
        locked: !!locked
    });
};

const update = async (id, name, description, interestRate, term, private) => {
    return AccountType.findByIdAndUpdate(id, {
        $set: { name, description, interestRate, date: new Date(), term, private }
    });
};

const remove = async (id) => {
    const accountType = await AccountType.findById(id);
    
    return accountType.remove();
};

module.exports = { all, byId, create, update, remove };