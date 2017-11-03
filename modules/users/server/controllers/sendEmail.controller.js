'use strict';
const nodemailer = require('nodemailer');

exports.sendEmail  = function(req,res){
  var data = req.body;
  var requirement={"email":null,"name":null,"message":null};
  for (var key in requirement) {
    if(!data[key] || data[key] == '' || data[key] == null) {
   //   console.log("error",key);
      return res.send({code: 400, message: "Please Enter " + key, success: false});
    }
  }
  
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'twohonlineserver@gmail.com',
        pass: 'twohonlineserver@'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: req.body.name+' '+ req.body.email, // sender address
    to: 'twohonline@gmail.com', // list of receivers
    subject: 'Contact', // Subject line
    text: data.message, // plain text body
    html: '<b> Name : '+data.name +' <br /> Email : '+data.email+' <br /> Phone : '+data.phoneNo+'<br />  Message : ' +data.message+'</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return res.send({code:200,message:"Message Successfully Sent",success:true});
});
    
}

exports.subscribe = function(user,res){
    let mailOptions = {
    from:'support@twohonline.com', // sender address
    to: user.email, // list of receivers
    subject: 'Wellcome To Two-h-online !.', // Subject line
    text: 'Wellcome to Two-h-online', // plain text body
    html: '<b> Thanks for subscribe twohonline , you will get all new updates and offers from twohonline ,Thanks Regards : support@twohonline.com </b>'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return res.send({code:200,message:"Message Successfully Sent",success:true});
});
    
}