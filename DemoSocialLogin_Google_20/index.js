const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 4000;
const path = require('path');
const passport = require('passport');
const session = require("express-session");


require('../DemoSocialLogin_Google/src/passposts/google');

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.get('/', (req, res) => {
  res.render('home')
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/failure',
  })
);

app.get('/auth/failure', (req, res) => {
  res.send('Some thing ...');
});


app.listen(port, () => {
  console.log(` listening at http://localhost:${port}`)
});