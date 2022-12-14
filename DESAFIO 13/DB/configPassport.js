const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const connectMongo = require('connect-mongo');
const Usuario = require('../js/usuarios');
const usuario = new Usuario();

app.use(session({
  store: connectMongo.create({
    mongoUrl: 'mongodb+srv://ipasciucco:39603426@cluster0.1lcuy.mongodb.net/sessions?retryWrites=true&w=majority',
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 600
  }),
  secret: 'secreto',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('registro',new localStrategy(
    {passReqToCallback: true},
    async (req, username, password, done) => {
        try{
            const existe = await usuario.findUser(username);
            if(existe){
                return done(null, false)
            }else{
                await usuario.addUser(username,password);
                return done(null, {email: username})
            }
        }catch(e){
            console.log(`Sucedió un error: ${e}`);
        }
    }
))

passport.use('login',new localStrategy(
    async (username, password, done) => {
        try{
            const existe = await usuario.findUserLogin(username,password);
            if(!existe){
                return done(null, false);
            }else{
                return done(null, existe);
            }
        }catch(e){
            console.log(`Sucedió un error: ${e}`);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.email)
});

passport.deserializeUser(async (email, done) => {
    try{
        const userDZ = await usuario.findUser(email);
        done(null, userDZ)
    }catch(e){
        console.log(`Sucedió un error: ${e}`);
    }
})

module.exports = passport