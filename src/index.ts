import * as dotenv from "dotenv";
import express, { Express, json } from "express";
import mongoose from "mongoose";
import passport from "passport";
import "./auth/passport";
import cookieSession from "cookie-session"
import cors from "cors";
import { vocaRouter } from "./api/vocaApi";
import { groupRouter } from "./api/groupApi";
import { googleAuthRouter } from "./api/googleAuthApi";

dotenv.config();
const app: Express = express();

//static variable
const port = process.env.PORT || 3000;
const cookieName = process.env.COOKIE_NAME || "name";
const cookieKey = process.env.COOKIE_KEY || "key";
const clientUrl = process.env.CLIENT_URL || "";

const google_client_id = process.env.GOOGLE_CLIENT_ID || "id";

const corsOptions = {
    origin: ["https://localhost:5173", "http://localhost:5173", "http://127.0.0.1:5173", clientUrl],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}

//middleware
//cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    name: cookieName,
    keys: [cookieKey],
}))
// register regenerate & save after the cookieSession middleware initialization
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb: any) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb: any) => {
            cb()
        }
    }
    next()
})


//passport | auth
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(json());

// api 
app.use('/', googleAuthRouter);
app.use('/group', groupRouter);
app.use('/vocabulary', vocaRouter);



// connect to db
const mongo_uri = process.env.MONGO_URI || '';

mongoose.connect(mongo_uri)
    .then(() => {
        app.listen(port, () => {
          console.log('Listening port ', port);
        });
    })
    .catch(error => console.log('Fail to connect DB', error))
