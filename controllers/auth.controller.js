var shortId = require('shortid');
var nodemailer = require('nodemailer');
var db = require('../db');
var bcrypt = require('bcrypt');

module.exports.login = function (req, res) {
    res.render('auth/login')
}


module.exports.postLogin = async function(req, res){
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

        var transport = nodemailer.createTransport({
            service: "Gmail",
            port: 2525,
            auth: {
              user: "minhthanh95ptit@gmail.com",
              pass: "Thanhkid1412ubqn"
            }
          });
        // console.log(transport);
        res.render("auth/login", {
            errors: ["Your account has been locked."],
            values: req.body
        });

        var mailOptions = {
            from: 'minhthanh95ptit@gmail.com',
            to: email,
            subject: 'Cảnh báo đăng nhập',
            text: `Your account ${email} has been locked`,
            html: '<b>Your account has been locked.Admin: Pham Minh Thanh<b/>'
           
          };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
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

    res.cookie('userId', user.id,{
        signed: true
    });
    res.redirect('/users');
}