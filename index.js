import dotenv from "dotenv";
dotenv.config()

import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import bodyParser from "body-parser";
import session from 'express-session';
import connectRedis from 'connect-redis';
let RedisStore = connectRedis(session);

import redis from 'redis3';

import passport from 'passport';
import LocalStrategy from 'passport-local';

import DataStore from "./dataStore.js";
import UserHelpers from "./userHelpers.js";

let redisClient = redis.createClient();

DataStore.connect();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'fst/build')));

app.use(session({
    store: new RedisStore({client:redisClient}),
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false
}))


passport.use(new LocalStrategy.Strategy((UserHelpers.getUser)));
passport.serializeUser(UserHelpers.crunchatizeUser);
passport.deserializeUser(UserHelpers.decrunchatizeUser);
  
app.use(passport.initialize());
app.use(passport.session());

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    next(new Error('Unauthorized'));
}


app.get('/api/hello', async (req, res) => {
    let x = await DataStore.getRecipe('testTwo');
    res.send(x);
});

app.get('/recipes',checkAuth, (req, res) => {
    res.send("SPAGHETTI IS GOOD IF FRIED");
});


  
app.post('/register', async (req, res, next) => {
    console.log(req.body);
    let value = await UserHelpers.registerUser(req.body.username, req.body.password);
    console.log(value);
    res.send('GOOD JOB!');
});

app.post("/login", passport.authenticate("local", { failureRedirect: "/login-failure", successRedirect: "/login-success" }));

app.get('/login-failure', (req, res, next) => {
    res.send('LOGIN FAILURE');
});

app.get('/login-success', (req, res, next) => {
    res.send('LOGIN SUCCESS');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/fst/build/index.html'));
});

app.use(function(error, req, res, next) {
    console.error(error);
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send({data: null, error: error.message, msg: null});
});


const port = process.env.PORT || 5000;
console.log('Connected on port ' + port);
app.listen(port);