module.exports = async (_, res) => res.render('user/home', { layout:'user', user:_.session.user });