/* eslint-disable  func-names */
/* eslint-disable  no-restricted-syntax */
/* eslint-disable  no-loop-func */
/* eslint-disable  consistent-return */
/* eslint-disable  no-console */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */

const nodemailer = require('nodemailer');
const maxApi = require('max-api');

let dotenv_module;
try {
  dotenv_module = require('dotenv');
  dotenv_module.config();
} catch (e) {
  maxApi.post(e, maxApi.POST_LEVELS.ERROR);
  maxApi.post('Please send \'script npm install\' to the node.script object to download node modules', maxApi.POST_LEVELS.ERROR);
  process.exit(1);
}

const handlers = {
  
  sendMail: (from, to, subject, text) => {
    let transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
    transport.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
    }, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  },
};

maxApi.addHandlers(handlers);
