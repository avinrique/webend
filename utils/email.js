var nodemailer = require('nodemailer');
const sendEmails =async options =>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'thevaincode@gmail.com',
          pass: 'tifh kqvx qfzz msmn'
        }
      });
      console.log("inside mailer")
      const mailOptions = {
        from: 'thevaincode@gmail.com',
        to: options.email,
        subject : "Passoword reset",
        html: `<h1 style="color : red;">The password reset link is :</h1>  <a href="${options.subject}"> ${options.subject}</a> `
      };
      console.log('shit it may be the reversehack')
     await transporter.sendMail(mailOptions)
}
module.exports = sendEmails