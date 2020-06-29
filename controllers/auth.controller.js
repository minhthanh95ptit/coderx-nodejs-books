var shortId = require('shortid');
var md5 = require('md5');
var db = require('../db');
var bcrypt = require('bcrypt');

module.exports.login = function (req, res) {
    res.render('auth/login')
}

module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    
    var user = db.get('users').find({
        email: email
       
    }).value();
    
    if (!user.wrongLoginCount) {
        db.get("users")
          .find({ id: user.id })
          .set("wrongLoginCount", 0)
          .write();
      }


    if (user.wrongLoginCount >= 4) {
    res.render("auth/login", {
        errors: ["Your account has been locked."],
        values: req.body
    });

    return;
    }
    if(!user){
        res.render('auth/login',{
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }   

    console.log(user);
    //ASYNC

    var saltRounds = 10;
    var myPlaintextPassword = password ;
    
    var salt = bcrypt.genSaltSync(saltRounds);
  //  const hash = bcrypt.hashSync(myPlaintextPassword, salt);

   // console.log(hash);


  //  console.log(user.password);

 //   console.log(bcrypt.compareSync(myPlaintextPassword, user.password));
    //hash -> store db user.password
    if(!bcrypt.compareSync(myPlaintextPassword, user.password)){

        db.get("users")
            .find({ id: user.id })
            .assign({ wrongLoginCount: (user.wrongLoginCount += 1) })
            .write();

        res.render('auth/login',{
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }

    if(user.wrongLoginCount >= 4){
        res.render('auth/login', {
                errors:[
                    'Qua 4 lan roi !!!'
                ],

                values: req.body     
            });
        return;
    }


    res.cookie('userId', user.id);
    res.redirect('/users');
}