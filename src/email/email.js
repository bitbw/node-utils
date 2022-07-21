/*
 * @Description: 使用邮箱给对方发送邮件
 * @Autor: Bowen
 * @Date: 2022-03-08 11:14:05
 * @LastEditors: Bowen
 * @LastEditTime: 2022-06-30 09:27:18
 */

/* 
JGPDCTVGNHMYYCOV zhangbowen_xyz@163.com
JLHMYQBARXNAVDNE iconfig_zbw@163.com
*/
const nodemailer = require("nodemailer");
// 成功开启POP3/SMTP服务，在第三方客户端登录时，登录密码输入以下授权密码
const auth = "JGPDCTVGNHMYYCOV";
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(options = {}) {
  // 结构参数
  const {
    to = "mail.bitbw@gmail.com", // list of receivers
    subject = "Hello ✔", // Subject line
    text = "Hello world?", // plain text body
    html = "<b>Hello world?</b> <h1> sendMail success </h1>", // html body
  } = options;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "zhangbowen_xyz@163.com", // generated ethereal user  //发送方邮箱
      pass: auth, // generated ethereal password //发送方邮箱的授权码,一般去邮箱设置里面找，应该可以找到
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "zhangbowen_xyz@163.com", // sender address //发送方邮箱
    to,
    subject,
    text,
    html,
    attachments: [
      // String attachment
      {
        filename: "notes.txt",
        content: "Some notes about this e-mail",
        contentType: "text/plain", // optional, would be detected from the filename
      },

      // Binary Buffer attachment
      {
        filename: "image.png",
        content: Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/" +
            "//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U" +
            "g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC",
          "base64"
        ),
        cid: "note@example.com", // should be as unique as possible
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendEmail()

module.exports = sendEmail;
