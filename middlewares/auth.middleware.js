var db = require('../db');

module.exports.requireAuth = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('auth/login');
        return;
    }

    var user = db.get('users').find({
        id: req.signedCookies.userId
    }).value();

    if(!user){
        res.redirect('auth/login');
        return;
    }

    res.locals.user = user;

    next();
};


module.exports.uniqueEmail = function(req, res, next){
    var email = req.body.email;
    var user = db.get('users').find({
        email: email
    }).value();

    if(user){
        res.redirect('auth/login');
        return;
    }

    next();
};