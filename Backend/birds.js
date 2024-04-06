// backend/server.js
/*
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 8001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tutorial', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define Bird Schema
const birdSchema = new mongoose.Schema({
  name: String,
  price: Number,
  Image: String
});

const birdData = [
    { id: 1, name: 'Parrot',  price: 50 },
    { id: 2, name: 'Eagle', price: 100 },
    { id: 3, name: 'Sparrow', price: 20 },
    // Add more bird data as neede
  ];


app.get('/birds', async (req, res) => {
    try {
      const birdData = await Bird.find();
      res.json(birdData);
    } catch (error) {
      console.error('Error fetching bird data:', error);
      res.status(500).json({ error: 'Error fetching bird data' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/
const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary").v2;
const mongoose = require('mongoose');

const app = express();
const port = 8001;

app.use(cors());
app.use(express.json());

app.use(fileUpload({
  useTempFiles:true
}))

cloudinary.config({ 
  cloud_name: 'dholi4gjn', 
  api_key: '328639927359834', 
  api_secret: 'gIQq8P6XGMtuuzXW6UiLdTDnYGM' 
});

mongoose.connect('mongodb://127.0.0.1:27017/tutorial', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.post('/adddata', async (req, res) => {
  try {
    const { name, price, type } = req.body;
    const file = req.files.image;

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath);

    // Save data to MongoDB after successful image upload
    let model;
    switch (type) {
      case "bird":
        model = Bird;
        break;
      case "cat":
        model = Cat;
        break;
      case "fish":
        model = Fish;
        break;
      case "dog":
        model = Dog;
        break;
      default:
        return res.status(400).send('Invalid type');
    }

    const newItem = new model({
      name: name,
      price: price,
      imageUrl: cloudinaryResponse.secure_url
    });

    await newItem.save();
    res.send('Data received and saved successfully');
  } catch (error) {
    console.error("Error occurred while processing data:", error);
    res.status(500).send('Internal server error');
  }
});


//Birds Schema

const birdSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});


const Bird = mongoose.model('Bird', birdSchema);

app.get('/birds', async (req, res) => {
  try {
    const birdData = await Bird.find();
    res.json(birdData);
  } catch (error) {
    console.error('Error fetching bird data:', error);
    res.status(500).json({ error: 'Error fetching bird data' });
  }
});

//Cats Schema

const catSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});


const Cat = mongoose.model('Cats', catSchema);

app.get('/cats', async (req, res) => {
  try {
    const catData = await Cat.find();
    res.json(catData);
  } catch (error) {
    console.error('Error fetching bird data:', error);
    res.status(500).json({ error: 'Error fetching bird data' });
  }

  
});



//Fish Schema

const fishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});


const Fish = mongoose.model('Fishs', fishSchema);

app.get('/fishs', async (req, res) => {
  try {
    const fishData = await Fish.find();
    res.json(fishData);
  } catch (error) {
    console.error('Error fetching fish data:', error);
    res.status(500).json({ error: 'Error fetching fish data' });
  }
});

//Dog Schema

const dogSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});


const Dog = mongoose.model('Dogs', dogSchema);

app.get('/dogs', async (req, res) => {
  try {
    const dogData = await Dog.find();
    res.json(dogData);
  } catch (error) {
    console.error('Error fetching dog data:', error);
    res.status(500).json({ error: 'Error fetching dog data' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

