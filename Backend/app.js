const express = require("express")
const cors = require("cors")

const app = express()


app.use(cors({}));
app.use(express.json());


require("./conn.js")
const feedback = require('./feedback')

const collection = require("./mongo")
const cart = require("./cart")

const birds = require("./birds");
const BirdsData = require("./birds");



//Get Data from MongoDB
app.get("/getData",async (req,res)=>{
    const data = await cart.find({});
    res.send(data);
})

//Post Data to MongoDB collection named Cart 
app.post("/postData",async (req,res)=>{
    console.log(req.body);
    await cart.create({...req.body});
    res.send("Hello");
})

app.post("/login",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email, password:password})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body
    const data={
        email:email,
        password:password
    }
    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist");
        }
        else{
            res.json("notexist");
            await collection.insertMany([data]);
        }

    }
    catch(e){
        res.json("fail")
    }
})





app.post("/EnquiryForm",async(req,res)=>{
    const {email, name, phone, message}=req.body;

    const data={
        email:email,
        name:name,
        phone:phone,
        message:message
    }

    try{
        const check=await collection.findOne({email:email, message:message})

        if(check){
            res.json("exist");
        }
        else{
            res.json("notexist");
            await collection.insertMany([data]);
          
        }
    }
    catch(e){
        res.json("fail")
    }

  

})

app.post("/Feedback",async(req,res)=>{
    const {email,name, phone, message} = req.body;
    
    const data={
        email:email,
        name:name,
        phone:phone,
        message:message
    }
    try{
        const check=await feedback.findOne({email:email, message:message})

        if(check){
            res.json("exist");
        }
        else{
            res.json("notexist");
            await feedback.insertMany([data]);
        }
    }
    catch(e){
        res.json("fail")
    }
})




app.listen(8000, (err) => {
    if (err) throw "Error";
    console.log("Listening to port ", 8000);
})
