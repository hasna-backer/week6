const authUser = (req, res, next) => {
    if (req.session.user && req.session.user.isLoggedin) {
        next();
    }
    else {
        res.redirect('/login');
    }
}
module.exports ={
    authUser
}