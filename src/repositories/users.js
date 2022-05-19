const bcrypt = require('bcrypt');
const User = require('../models/User');

const userType = {
    CLIENT: 1,
    MANAGER: 2
};

const all = async ( user, filter = undefined) => {
    let filterData = {};

    if(user && user.type == 2){
       filterData = { type:  1 };
    };

    if (filter) {
        filterData = {
            name: {
                $regex: `.*${filter}.*`,
                $options: 'i'
            }
        };
    }
    return User.find(filterData).lean();
     
};

const createPasswordHash = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainPassword, salt);
};

const createUserClient = async (  name, email, password, address, phone, work, nif) => {
    const hash = await createPasswordHash(password);
    const manager = await getUserManager();
    return User.create({ name, email, password: hash, address, phone, work, nif, type: userType.CLIENT, manager: manager._id })
};


const createUserClientManager = async (name, email, address, phone, work, nif) => {

    return User.create({name, email, address, phone, work, nif, type: userType.CLIENT })
};

const createUserManager = async (name, office, email, password, address, phone, nif) => {
   
    const hash = await createPasswordHash(password);
    return User.create({name, office, email, password: hash, address, phone, nif, type: userType.MANAGER })
};

const updateUser = async (id, name, email, password, address, phone, work, nif) => {
    const user = await User.findById(id);
    user.name = name;
    user.email = email;
    user.address = address;
    user.phone = phone;
    user.work = work;
    user.nif = nif;

    if (password) {
        const hash = await createPasswordHash(password);
        user.password = hash;
    };
    
    await user.save();
    return user;
};

const updateUserManager = async (id, name, email, address, phone, work, nif) => {
    const user = await User.findById(id);
    user.name = name;
    user.email = email;
    user.address = address;
    user.phone = phone;
    user.work = work;
    user.nif = nif;
    
    await user.save();
    return user;
};


const updateAccountUser = async (id, account) => {
    const user = await User.findById(id);
    user.account = account;
    return await user.save();
}

const userByEmail = async (email) =>  User.findOne({ email });

const getUserManager = async () =>  User.findOne({ type: userType.MANAGER });

const byId = async (id) => User.findById(id).lean();

const remove = async (id) => {
    const client = await User.findById(id);

    return client.remove();
};

module.exports = { createUserClient, createUserManager, userByEmail, updateUser , updateUserManager, userType, updateAccountUser, createUserClientManager, all, byId, remove};