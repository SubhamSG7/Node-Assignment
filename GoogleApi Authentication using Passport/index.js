const express = require('express')
const app = express()
const port = 3000
var session = require('express-session');
const passport = require('passport');
require('./auth');


app.set('views','./views');
app.set('views engine','ejs');


app.use(passport.initialize());
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(passport.session())

function isLogged(req,res,next){
    req.user?next():res.sendStatus(401);
}


app.get('/',(req,res)=>{
    res.render('homepage.ejs')
})
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/auth/protected');
  });


app.get('/auth/failed',(req,res)=>{
    res.send(`Something Went Wrong`);
})


app.get('/auth/protected',isLogged,(req,res)=>{
    let name=req.user.displayName;
    res.send(`Hello ${name}`)
})
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.send(`See You Again`);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))