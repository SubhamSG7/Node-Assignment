const  express = require('express')
const app = express();
const passport=require('passport');
const session = require('express-session')
const port = 3030;
require('./auth');


app.set('views','./views');
app.set('view engine','ejs');
app.use(passport.initialize());
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(passport.session());



app.get('/', (req, res) => res.render('homepage.ejs'));

function isLoggedIn(req,res,next){
    req.user?next():res.sendStatus(401);
}

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
app.get('/auth/protected',isLoggedIn,(req,res)=>{
    res.send(`Hello Sir`)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))