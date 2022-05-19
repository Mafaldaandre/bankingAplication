module.exports = async (req, res) => {
    const session = req.session;
    session.auth = undefined;
    session.user = undefined;

    session.destroy();

    return res.redirect('/');
};