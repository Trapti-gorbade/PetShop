const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/tutorial")
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log('failed',e);
})

const feedbackSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:false },
})

const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;
