module.exports = async (_, res) => res.render('manager/home', { layout:'manager',  user:_.session.user });