import express from 'express';
import passport from 'passport';
import * as dotenv from 'dotenv';

dotenv.config();
export const googleAuthRouter = express.Router();

const clientUrl = process.env.CLIENT_URL || "";

// handle login success
googleAuthRouter.get('/login/success', (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: 'Login successfully',
            user: req.user
        })
    }else{
        res.status(401).json({
            success: false,
            message: 'Login failed'
        })
    }
    
})
// handle login failed
googleAuthRouter.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'Login failed'
    })
})
// handle logout
googleAuthRouter.get('/logout', (req, res, next) => {
    req.logout(err => {
        if(err) return next(err);
      });
    res.redirect(clientUrl);
})

// handle first click login
googleAuthRouter.get('/google/login', passport.authenticate('google', { scope: ["profile", "email"] }));
// handle call back
googleAuthRouter.get('/google/callback', passport.authenticate('google', {
    successRedirect: clientUrl,
    failureRedirect: "login/failed"
}))