const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const nodemailer = require("nodemailer");

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app.html');
});

app.post('/send', async (req, res) => {
  const output = `
    <p>You have a new request</p>
    <ul>
    <li>Name:${req.body.name}</li>
    <li>Email${req.body.email}</li>
    </ul>
  `;
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    },
  });
  console.log(transporter)
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.DB_USER, // sender address
    to: "quangviet.nguyen19@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });
  res.send('successful...');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});