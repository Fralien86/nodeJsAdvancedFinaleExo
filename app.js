const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./app.router');
const engine = require('express-hbs');
const passport = require('passport');
const session = require('express-session');
const sessionStore = new session.MemoryStore;
const User = mongoose.model('user')
const { registerHelpers } = require('./helpers/staticgmap');

app.use(express.static(`${process.cwd()}/public`))

app.use(session({
    store: sessionStore,
    saveUninitialized:true,
    resave:true,
    secret:'secret'
}))


app.engine('hbs', engine.express4({
    partialsDir:`${process.cwd()}/views/partials`,
    defaultLayout :`${process.cwd()}/views/layouts/default.hbs`
}))

app.set('view engine', 'hbs');
//app.set('view', `${process.cwd()}/views`);

registerHelpers(engine);

// app.use((req,res,next)=>{
//     console.log(req.method, req.url);
//     next()
// })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session())

app.use(router);

app.use((req,res,next)=>{
    const error = new Error ('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500).send({
        error:{
            status : error.status || 500,
            message: error.message ||'Internat server error'
        }
    })
})



module.exports = app
