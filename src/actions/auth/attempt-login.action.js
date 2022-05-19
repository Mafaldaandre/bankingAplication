const { attemptLogin } = require("../../services/auth");
const { calcInterest } = require("../../repositories/utils");

module.exports = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await attemptLogin(email, password);
        const session = req.session;
        session.auth = true;
        session.user = user;
        if(user.type ==2) {
            return res.redirect('/manager/home')
        };

        calcInterest(user);

        return res.redirect('/user/home');

    } catch (err) {
        return res.render('login', { layout: false, message: err.message });
    };
};