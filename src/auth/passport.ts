import passportGoogleAuth from "passport-google-oauth20";
import passport from "passport"
import userModel from "../models/userModel";
import * as dotenv from "dotenv";

dotenv.config();

const clientId = process.env.GOOGLE_CLIENT_ID || "id";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "secret";
const GoogleStrategy = passportGoogleAuth.Strategy;

passport.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        let user: any = null;
        try {
            user = await userModel.findOne({ googleId: profile.id });
        } catch (error: any) {
            console.log("Error find user", error);
        }
        if (!user) {
            // register
            user = {
                username: profile.displayName,
                googleId: profile.id,
                photo: profile.photos && profile.photos[0].value,
                email: profile.emails && profile.emails[0].value
            }
            try {
                const userDB = await userModel.create(user);
                return done(null, userDB);
            } catch (error: any) {
                console.log("Error create user", error);
                return done(error, undefined);
            }
        } else {
            // login
            return done(null, user);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser(async (id, done) => {
    let user: any = null;
    try {
        user = await userModel.findOne({ _id: id });
    } catch (error: any) {
        console.log("Error find user", error);
        done(error, undefined)
    }
    done(null, user);
})
