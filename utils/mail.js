const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const path = require("path");

function sendMail(params) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_TOKEN,
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        layoutsDir: path.join(__dirname, "../views/emails/layouts"),
        defaultLayout: "main",
      },
      viewPath: path.join(__dirname, "../views/emails"),
      extName: ".handlebars",
    })
  );

  const mailData = {
    from: '"Toko DIGIDUCT" <admin@digiduct.com>',
    to: params.to,
    subject: params.subject,
    template: params.template,
    context: params.context,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = {
  sendMail,
};
