import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "81496513072-6tiva6992vbda70n86m74ah9a6nu432i.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL:
        `${process.env.APP_URL}/google/callback` ||
        "http://localhost:8080/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

console.log("passport-setup.js cargado");
