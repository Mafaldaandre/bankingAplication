function userPathValidation(req, res, next) {
    const { user } = req.session;

    if (!user) {
        return res.redirect('/auth/login');
    }

    if (user.type !== 1) {
       return res.redirect('404');
    }

    next();
}


function managerPathValidation(req, res, next) {
 const { user } = req.session;

    if (!user) {
        return res.redirect('/auth/login');
    }

    if (user.type !== 2) {
        return res.redirect('404');
    }
    next();
}
module.exports = { userPathValidation, managerPathValidation };