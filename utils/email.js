var nodemailer = require('nodemailer');
const sendEmails =async options =>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'reversehack127.0.0.1@gmail.com',
          pass: 'qpjekzgirinvzprc'
        }
      });
      console.log("inside mailer")
      const mailOptions = {
        from: 'reversehack127.0.0.1@gmail.com',
        to: options.email,
        subject: options.subject,
        html: `<h1 style="color : red;">Welcome the game</h1>  <p>The password for the game is huge </p><br><p>Well you are the nd partcipant . </p> `
      };
      console.log('shit it may be the reversehack')
     await transporter.sendMail(mailOptions)
}
module.exports = sendEmails