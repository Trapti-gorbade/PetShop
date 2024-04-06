const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/tutorial")
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log('failed',e);
})