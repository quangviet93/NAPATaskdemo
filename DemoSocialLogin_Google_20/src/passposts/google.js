const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '722193465847-qq0p8csvmoh5tjl59tntc4pnunf4lva5.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'C48eh1bJOV-jLXC0V2nNjSvK';
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:4000/auth/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});