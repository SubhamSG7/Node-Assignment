const express=require('express');
const bodyParser=require('body-parser');
const connect=require('./connections/mongoconnect');     // importing DB connection 
const userRoute=require('./routes/userRoute');           //importing userRoute
const registeruser=require('./routes/registerUser');       // importing registerUser Route



const app=express();
app.use(bodyParser.json());
connect();        // function call to connect with the database


app.use('/api/v1/users',userRoute);   // route to handle users requests
app.use('/api/v1/register',registeruser);   // route to handle new registration of a user


app.get('/',(req,res)=>{
    res.send(`<h1>Hello world!</h1>`)
})
app.listen(3030,()=>{
    console.log(`App is Listening at 3030`);
})