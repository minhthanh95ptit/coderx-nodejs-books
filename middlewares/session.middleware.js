var shortId = require('shortid');
var db = require('../db');
module.exports = function(req, res, next){
    if(!req.signedCookies.sessionId){
        var sessionId = shortId.generate();
        res.cookie("sessionId", sessionId,{
            signed: true
        });
        
        console.log(sessionId);
        db.get('sessions').push({
            id: sessionId
        }).write();
    }
   
    next();
}
