const mongoose=require('mongoose');



async function connect(){
    
await mongoose.connect('mongodb://localhost/subham');
}
module.exports=connect;