const bcrypt = require('bcrypt');
const { userByEmail } = require("../repositories/users");

const attemptLogin = async (email, password) => {
    const user = await userByEmail(email);

    if (!user) {
        throw new Error('Bad credentials');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error('Bad credentials');
    }

    return user;
};

module.exports = { attemptLogin };